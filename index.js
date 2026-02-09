import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import z from "zod";

const app = express();
app.use(express.json());

/* =========================
   1️⃣ CREATE MCP SERVER
========================= */
const mcpServer = new McpServer({
  name: "my-first-mcp-server",
  version: "1.0.0"
});

/* =========================
   2️⃣ REGISTER TOOLS HERE ✅
========================= */

// Tool 1
mcpServer.registerTool(
  "hello",
  {
    title: "Hello Tool",
    description: "Returns a greeting",
    inputSchema: {},
    outputSchema: {
      message: z.string()
    }
  },
  async () => ({
    content: [{ type: "text", text: "Hello from MCP 👋" }],
    structuredContent: { message: "Hello from MCP 👋" }
  })
);

// Tool 2
mcpServer.registerTool(
  "addNumbers",
  {
    title: "Add Numbers",
    description: "Adds two numbers",
    inputSchema: {
      a: z.number(),
      b: z.number()
    },
    outputSchema: {
      result: z.number()
    }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: `Sum is ${a + b}` }],
    structuredContent: { result: a + b }
  })
);

/* =========================
   3️⃣ MCP ENDPOINT
========================= */
app.post("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport({
    enableJsonResponse: true
  });

  res.on("close", () => transport.close());

  await mcpServer.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

/* =========================
   4️⃣ START SERVER
========================= */
app.listen(3000, () => {
  console.log("✅ MCP Server running at http://localhost:3000/mcp");
});
