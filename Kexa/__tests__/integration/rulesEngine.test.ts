import { describe, it } from "bun:test";
import { checkRule, checkParentRule, checkCondition } from "../../services/analyse.service";
import { ConditionEnum } from "../../enum/condition.enum";
import { OperatorEnum } from "../../enum/operator.enum";
import type { RulesConditions, ParentRules } from "../../models/settingFile/conditions.models";

const { expect } = require("chai");

// ─── Scenario 1: Simple condition — EQUAL ────────────────────────────────────

describe("Rules engine: EQUAL condition", () => {
    it("code 200 EQUAL 200 → should pass", () => {
        const conditions: RulesConditions[] = [
            { property: "code", condition: ConditionEnum.EQUAL, value: 200 },
        ];
        const result = checkRule(conditions, { code: 200 });
        expect(result).to.have.length(1);
        expect(result[0].result).to.equal(true);
    });

    it("code 200 EQUAL 404 → should fail", () => {
        const conditions: RulesConditions[] = [
            { property: "code", condition: ConditionEnum.EQUAL, value: 404 },
        ];
        const result = checkRule(conditions, { code: 200 });
        expect(result).to.have.length(1);
        expect(result[0].result).to.equal(false);
    });

    it("string EQUAL string → should pass", () => {
        const conditions: RulesConditions[] = [
            { property: "name", condition: ConditionEnum.EQUAL, value: "kexa" },
        ];
        const result = checkRule(conditions, { name: "kexa" });
        expect(result[0].result).to.equal(true);
    });

    it("DIFFERENT condition → should pass when values differ", () => {
        const conditions: RulesConditions[] = [
            { property: "code", condition: ConditionEnum.DIFFERENT, value: 404 },
        ];
        const result = checkRule(conditions, { code: 200 });
        expect(result[0].result).to.equal(true);
    });
});

// ─── Scenario 2: Composite rule — OR operator ───────────────────────────────

describe("Rules engine: OR operator", () => {
    const orRule: ParentRules = {
        operator: OperatorEnum.OR,
        criteria: [
            { property: "code", condition: ConditionEnum.EQUAL, value: 200 },
            { property: "code", condition: ConditionEnum.EQUAL, value: 201 },
        ],
    };

    it("code 201 matches second criteria → should pass", () => {
        const result = checkRule([orRule], { code: 201 });
        expect(result).to.have.length(1);
        expect(result[0].result).to.equal(true);
    });

    it("code 200 matches first criteria → should pass", () => {
        const result = checkRule([orRule], { code: 200 });
        expect(result[0].result).to.equal(true);
    });

    it("code 500 matches none → should fail", () => {
        const result = checkRule([orRule], { code: 500 });
        expect(result[0].result).to.equal(false);
    });
});

// ─── Scenario 3: Composite rule — NAND operator ─────────────────────────────

describe("Rules engine: NAND operator", () => {
    const nandRule: ParentRules = {
        operator: OperatorEnum.NAND,
        criteria: [
            { property: "code", condition: ConditionEnum.EQUAL, value: 200 },
            {
                property: "headers.content-type",
                condition: ConditionEnum.INCLUDE,
                value: "application/json",
            },
        ],
    };

    it("both criteria true → NAND should fail", () => {
        const resource = {
            code: 200,
            headers: { "content-type": "application/json; charset=utf-8" },
        };
        const result = checkRule([nandRule], resource);
        expect(result[0].result).to.equal(false);
    });

    it("one criteria false → NAND should pass", () => {
        const resource = {
            code: 404,
            headers: { "content-type": "application/json" },
        };
        const result = checkRule([nandRule], resource);
        expect(result[0].result).to.equal(true);
    });

    it("both criteria false → NAND should pass", () => {
        const resource = {
            code: 500,
            headers: { "content-type": "text/html" },
        };
        const result = checkRule([nandRule], resource);
        expect(result[0].result).to.equal(true);
    });
});

// ─── Scenario 4: Nested properties (dot notation) ───────────────────────────

describe("Rules engine: dot notation properties", () => {
    it("tls.protocolVersion REGEX match → should pass", () => {
        const conditions: RulesConditions[] = [
            {
                property: "tls.protocolVersion",
                condition: ConditionEnum.REGEX,
                value: "TLSv1.[2-9]",
            },
        ];
        const resource = { tls: { protocolVersion: "TLSv1.3" } };
        const result = checkRule(conditions, resource);
        expect(result[0].result).to.equal(true);
    });

    it("tls.protocolVersion REGEX no match → should fail", () => {
        const conditions: RulesConditions[] = [
            {
                property: "tls.protocolVersion",
                condition: ConditionEnum.REGEX,
                value: "TLSv1.[2-9]",
            },
        ];
        const resource = { tls: { protocolVersion: "TLSv1.0" } };
        const result = checkRule(conditions, resource);
        expect(result[0].result).to.equal(false);
    });

    it("deep nested property — certificate.issuer.CN", () => {
        const conditions: RulesConditions[] = [
            {
                property: "certificate.issuer.CN",
                condition: ConditionEnum.EQUAL,
                value: "Let's Encrypt",
            },
        ];
        const resource = { certificate: { issuer: { CN: "Let's Encrypt" } } };
        const result = checkRule(conditions, resource);
        expect(result[0].result).to.equal(true);
    });

    it("INCLUDE on nested header", () => {
        const conditions: RulesConditions[] = [
            {
                property: "headers.content-type",
                condition: ConditionEnum.INCLUDE,
                value: "json",
            },
        ];
        const resource = { headers: { "content-type": "application/json" } };
        const result = checkRule(conditions, resource);
        expect(result[0].result).to.equal(true);
    });
});

// ─── Scenario 5: Missing / null properties ──────────────────────────────────

describe("Rules engine: missing and null properties", () => {
    it("missing property → condition should fail (not crash)", () => {
        const conditions: RulesConditions[] = [
            { property: "nonexistent", condition: ConditionEnum.EQUAL, value: "x" },
        ];
        const result = checkRule(conditions, { code: 200 });
        expect(result).to.have.length(1);
        expect(result[0].result).to.equal(false);
    });

    it("null nested property → should fail gracefully", () => {
        const conditions: RulesConditions[] = [
            {
                property: "tls.protocolVersion",
                condition: ConditionEnum.EQUAL,
                value: "TLSv1.3",
            },
        ];
        const result = checkRule(conditions, { tls: null });
        expect(result).to.have.length(1);
        expect(result[0].result).to.equal(false);
    });

    it("empty object → should fail gracefully", () => {
        const conditions: RulesConditions[] = [
            { property: "code", condition: ConditionEnum.EQUAL, value: 200 },
        ];
        const result = checkRule(conditions, {});
        expect(result[0].result).to.equal(false);
    });

    it("undefined resource property treated as empty string", () => {
        const conditions: RulesConditions[] = [
            { property: "code", condition: ConditionEnum.EQUAL, value: "" },
        ];
        const result = checkRule(conditions, {});
        // undefined becomes '' in checkCondition, so '' EQUAL '' should pass
        expect(result[0].result).to.equal(true);
    });
});
