import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn, type ChildProcess } from "child_process";
import path from "path";

const PROJECT_ROOT = path.resolve(import.meta.dir, "../../..");
const MCP_SERVER = path.resolve(PROJECT_ROOT, "Kexa/mcp-server.ts");

let client: Client;
let transport: StdioClientTransport;

beforeAll(async () => {
  transport = new StdioClientTransport({
    command: "bun",
    args: [MCP_SERVER],
    cwd: PROJECT_ROOT,
    env: {
      ...process.env,
      RULESDIRECTORY: "./perProvider",
    },
  });

  client = new Client({ name: "test-client", version: "1.0.0" });
  await client.connect(transport);
}, 30_000);

afterAll(async () => {
  await client?.close();
});

// ─── Server initialization ────────────────────────────────────────────────────

describe("MCP Server", () => {
  it("should expose server info", () => {
    const info = client.getServerVersion();
    expect(info?.name).toBe("kexa");
    expect(info?.version).toBe("1.0.0");
  });

  it("should list exactly 5 tools", async () => {
    const { tools } = await client.listTools();
    expect(tools).toHaveLength(5);

    const names = tools.map((t) => t.name).sort();
    expect(names).toEqual([
      "kexa_check_resource",
      "kexa_gather",
      "kexa_list_providers",
      "kexa_list_rules",
      "kexa_scan",
    ]);
  });

  // ─── kexa_list_providers ────────────────────────────────────────────────────

  describe("kexa_list_providers", () => {
    it("should list providers with ssh configured", async () => {
      const result = await client.callTool({
        name: "kexa_list_providers",
        arguments: {},
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("Configured providers");
      expect(text).toContain("ssh");
    });

    it("should filter by provider name", async () => {
      const result = await client.callTool({
        name: "kexa_list_providers",
        arguments: { provider: "ssh" },
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("ssh");
      // Should not mention other providers in the configured section
      expect(text).not.toContain("**kubernetes**");
    });
  });

  // ─── kexa_list_rules ────────────────────────────────────────────────────────

  describe("kexa_list_rules", () => {
    it("should parse and list SSH rules", async () => {
      const result = await client.callTool({
        name: "kexa_list_rules",
        arguments: { rulesDirectory: "./perProvider", provider: "ssh" },
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("Rules summary");
      expect(text).toContain("ssh-cis-5.2.10-no-root-login");
      expect(text).toContain("total rules");
    });

    it("should parse PostgreSQL rules", async () => {
      const result = await client.callTool({
        name: "kexa_list_rules",
        arguments: { rulesDirectory: "./perProvider", provider: "postgresql" },
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("pg-cis-2.1-ssl-enabled");
    });

    it("should parse MySQL rules", async () => {
      const result = await client.callTool({
        name: "kexa_list_rules",
        arguments: { rulesDirectory: "./perProvider", provider: "mysql" },
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("mysql-cis-2.7-ssl-enabled");
    });
  });

  // ─── kexa_check_resource (zero-infra, the most testable) ───────────────────

  describe("kexa_check_resource", () => {
    it("should FAIL when resource does not match condition", async () => {
      const result = await client.callTool({
        name: "kexa_check_resource",
        arguments: {
          resource: JSON.stringify({ permitrootlogin: "yes" }),
          conditions: JSON.stringify([
            { property: "permitrootlogin", condition: "EQUAL", value: "no" },
          ]),
        },
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("FAILED");
      expect(text).toContain("FAIL condition 1");
      expect(text).toContain('"yes"');
    });

    it("should PASS when resource matches condition", async () => {
      const result = await client.callTool({
        name: "kexa_check_resource",
        arguments: {
          resource: JSON.stringify({ permitrootlogin: "no" }),
          conditions: JSON.stringify([
            { property: "permitrootlogin", condition: "EQUAL", value: "no" },
          ]),
        },
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("PASSED");
    });

    it("should handle multiple conditions", async () => {
      const result = await client.callTool({
        name: "kexa_check_resource",
        arguments: {
          resource: JSON.stringify({ maxauthtries: 6, port: 22 }),
          conditions: JSON.stringify([
            { property: "maxauthtries", condition: "INF_OR_EQUAL", value: 4 },
            { property: "port", condition: "EQUAL", value: 22 },
          ]),
        },
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("FAILED");
      expect(text).toContain("1 failed");
      // port=22 should pass, maxauthtries=6 should fail
      expect(text).toContain("PASS condition 2");
      expect(text).toContain("FAIL condition 1");
    });

    it("should handle DIFFERENT condition", async () => {
      const result = await client.callTool({
        name: "kexa_check_resource",
        arguments: {
          resource: JSON.stringify({ clientaliveinterval: "300" }),
          conditions: JSON.stringify([
            {
              property: "clientaliveinterval",
              condition: "DIFFERENT",
              value: "0",
            },
          ]),
        },
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("PASSED");
    });

    it("should handle SUP_OR_EQUAL condition", async () => {
      const result = await client.callTool({
        name: "kexa_check_resource",
        arguments: {
          resource: JSON.stringify({ validate_password_length: 12 }),
          conditions: JSON.stringify([
            {
              property: "validate_password_length",
              condition: "SUP_OR_EQUAL",
              value: 8,
            },
          ]),
        },
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("PASSED");
    });

    it("should return error on invalid JSON resource", async () => {
      const result = await client.callTool({
        name: "kexa_check_resource",
        arguments: {
          resource: "not-json",
          conditions: '[{"property":"x","condition":"EQUAL","value":1}]',
        },
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("invalid JSON");
      expect(result.isError).toBe(true);
    });

    it("should return error on invalid conditions", async () => {
      const result = await client.callTool({
        name: "kexa_check_resource",
        arguments: {
          resource: '{"x":1}',
          conditions: "not-json",
        },
      });
      const text = (result.content as any)[0].text as string;
      expect(text).toContain("valid JSON array");
      expect(result.isError).toBe(true);
    });

    it("should handle nested ParentRules with operators", async () => {
      const result = await client.callTool({
        name: "kexa_check_resource",
        arguments: {
          resource: JSON.stringify({ name: "avahi-daemon", state: "disabled" }),
          conditions: JSON.stringify([
            {
              operator: "OR",
              criteria: [
                { property: "name", condition: "DIFFERENT", value: "avahi-daemon" },
                { property: "state", condition: "EQUAL", value: "disabled" },
              ],
            },
          ]),
        },
      });
      const text = (result.content as any)[0].text as string;
      // name IS avahi-daemon (first fails), but state IS disabled (second passes) → OR passes
      expect(text).toContain("PASSED");
    });
  });
});
