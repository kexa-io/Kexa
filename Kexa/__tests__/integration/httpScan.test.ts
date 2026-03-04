import { describe, it, beforeAll } from "bun:test";
import { checkRules } from "../../services/analyse.service";
import { collectData } from "../../services/addOn/httpGathering.service";
import type { ProviderResource } from "../../models/providerResource.models";
import type { ResultScan } from "../../models/resultScan.models";
import { ConditionEnum } from "../../enum/condition.enum";
import { OperatorEnum } from "../../enum/operator.enum";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const { expect } = require("chai");

Bun.env.BUN_TEST_TIMEOUT = "30000";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fixturesDir = path.join(import.meta.dir, "fixtures");

function loadHTTPRulesFromYAML() {
    const content = fs.readFileSync(path.join(fixturesDir, "rules", "HTTPRules.yaml"), "utf8");
    const docs = yaml.load(content) as any[];
    return docs[0];
}

const httpConfig = {
    name: "check kexa website",
    prefix: "ENDPOINTA-",
    rules: ["HTTPRules"],
    METHOD: "GET",
    URL: "https://www.kexa.io",
    body: {},
};

const fakeAlert = {
    fatal: { enabled: false, type: ["log"], to: [] },
    error: { enabled: false, type: ["log"], to: [] },
    warning: { enabled: false, type: ["log"], to: [] },
    info: { enabled: false, type: ["log"], to: [] },
    global: {
        enabled: true,
        type: ["log"],
        to: [],
        conditions: [
            { level: 0, min: 1 },
            { level: 1, min: 1 },
            { level: 2, min: 1 },
            { level: 3, min: 1 },
        ],
        name: "HTTPRules",
    },
};

const configFuzz = { http: [{ rules: ["HTTPRules"] }] };

// ─── Scenario 1: Full HTTP pipeline ─────────────────────────────────────────

describe("Integration: HTTP scan pipeline", () => {
    let settingFile: any;
    let resources: ProviderResource;
    let results: ResultScan[][];

    beforeAll(async () => {
        settingFile = loadHTTPRulesFromYAML();
        settingFile.alert.global.name = "HTTPRules";

        const httpData = await collectData([httpConfig as any]);
        resources = {
            http: httpData ? [{ request: httpData[0]?.request ?? [] }] : [],
        };

        results = checkRules(settingFile.rules, resources, settingFile.alert, configFuzz);
    });

    it("should load HTTP rules from YAML", () => {
        expect(settingFile).to.not.be.undefined;
        expect(settingFile.rules).to.be.an("array").that.is.not.empty;
        expect(settingFile.rules).to.have.length(5);
    });

    it("should gather HTTP resources without crash", () => {
        expect(resources).to.have.property("http");
        expect(resources.http).to.be.an("array").that.is.not.empty;
        expect(resources.http[0]).to.have.property("request");
        expect(resources.http[0].request).to.be.an("array").that.is.not.empty;
    });

    it("should produce ResultScan[][] with correct structure", () => {
        expect(results).to.be.an("array");
        results.forEach((ruleResults) => {
            expect(ruleResults).to.be.an("array");
            ruleResults.forEach((rs) => {
                expect(rs).to.have.property("rule");
                expect(rs).to.have.property("error");
                expect(rs.error).to.be.an("array");
                expect(rs).to.have.property("objectContent");
            });
        });
    });

    it("should evaluate all 5 applied rules", () => {
        expect(results.length).to.equal(5);
    });

    // ─── Scenario 2: Specific verifications ──────────────────────────────────

    it("kexa.io should return HTTP 200", () => {
        const httpResource = resources.http[0].request[0] as any;
        expect(httpResource.code).to.equal(200);
    });

    it("kexa.io TLS version should be >= 1.2", () => {
        const httpResource = resources.http[0].request[0] as any;
        expect(httpResource.tls).to.not.be.null;
        expect(httpResource.tls.protocolVersion).to.match(/TLSv1\.[2-9]/);
    });
});

// ─── Scenario 3: Rules with forged fixtures (no network) ────────────────────

describe("Integration: HTTP rules with fixtures", () => {
    const responseCodeRule = {
        name: "http-request-response-code",
        applied: true,
        level: 0,
        cloudProvider: "http",
        objectName: "request",
        conditions: [
            {
                operator: OperatorEnum.OR,
                criteria: [
                    { property: "code", condition: ConditionEnum.EQUAL, value: 200 },
                    { property: "code", condition: ConditionEnum.EQUAL, value: 201 },
                ],
            },
        ],
    };

    const tlsRule = {
        name: "http-TLS-version",
        applied: true,
        level: 3,
        cloudProvider: "http",
        objectName: "request",
        conditions: [
            {
                property: "tls.protocolVersion",
                condition: ConditionEnum.REGEX,
                value: "TLSv1.[2-9]",
            },
        ],
    };

    function makeResource(overrides: Record<string, any> = {}) {
        return {
            code: 200,
            url: "https://www.kexa.io",
            headers: { "content-type": "text/html" },
            body: null,
            certificate: null,
            ip: "1.2.3.4",
            delays: 100,
            tls: { cipherName: "TLS_AES_256_GCM_SHA384", protocolVersion: "TLSv1.3" },
            ...overrides,
        };
    }

    function makeProviderResource(httpRequest: any): ProviderResource {
        return { http: [{ request: [httpRequest] }] };
    }

    it("compliant resource (code 200) should pass response code rule", () => {
        const resource = makeResource({ code: 200 });
        const results = checkRules(
            [responseCodeRule],
            makeProviderResource(resource),
            fakeAlert as any,
            configFuzz
        );
        expect(results).to.have.length(1);
        expect(results[0][0].error).to.have.length(0);
    });

    it("non-compliant resource (code 500) should fail response code rule", () => {
        const resource = makeResource({ code: 500 });
        const results = checkRules(
            [responseCodeRule],
            makeProviderResource(resource),
            fakeAlert as any,
            configFuzz
        );
        expect(results).to.have.length(1);
        expect(results[0][0].error.length).to.be.above(0);
    });

    it("TLS 1.3 should pass TLS rule", () => {
        const resource = makeResource({
            tls: { protocolVersion: "TLSv1.3", cipherName: "X" },
        });
        const results = checkRules(
            [tlsRule],
            makeProviderResource(resource),
            fakeAlert as any,
            configFuzz
        );
        expect(results).to.have.length(1);
        expect(results[0][0].error).to.have.length(0);
    });

    it("TLS 1.0 should fail TLS rule", () => {
        const resource = makeResource({
            tls: { protocolVersion: "TLSv1.0", cipherName: "X" },
        });
        const results = checkRules(
            [tlsRule],
            makeProviderResource(resource),
            fakeAlert as any,
            configFuzz
        );
        expect(results).to.have.length(1);
        expect(results[0][0].error.length).to.be.above(0);
    });
});
