🧠 MCP Server with Node.js (Claude Integration)

This project demonstrates how to build a Model Context Protocol (MCP) server using Node.js and expose custom tools that Claude Desktop can call.

🚀 What This Project Does

Creates an MCP server using Node.js

Registers custom tools (e.g. hello, addNumbers)

Exposes the server over HTTP

Uses ngrok to make the local server publicly accessible

Connects the server to Claude Desktop via mcp.json

⚠️ Important Limitation (Read First)

❗ Custom MCP servers ONLY work with Claude Desktop
They do NOT work with:

Claude Web (browser)

Cursor

VS Code Claude extensions

You must install Claude Desktop to use MCP.

📂 Project Structure
mcp-project/
├── index.js
├── package.json
├── package-lock.json
└── node_modules/

🛠️ Prerequisites

Node.js v18+

npm

ngrok account (free)

Claude Desktop (mandatory)

📦 Installation
1️⃣ Clone or create the project
git clone <your-repo>
cd mcp-project


or

mkdir mcp-project
cd mcp-project
npm init -y

2️⃣ Install dependencies
npm install express zod @modelcontextprotocol/sdk

3️⃣ Enable ES Modules

In package.json:

{
  "type": "module",
  "scripts": {
    "start": "node index.js"
  }
}

🧠 MCP Server Code (index.js)

Example tools included:

hello – returns a greeting

addNumbers – adds two numbers

Tools are registered after creating McpServer and before handling requests.

▶️ Run the MCP Server
npm start


Expected output:

✅ MCP Server running at http://localhost:3000/mcp

🌍 Expose Server Using ngrok
1️⃣ Add ngrok auth token (one-time)
ngrok config add-authtoken YOUR_REAL_AUTHTOKEN

2️⃣ Start ngrok
ngrok http 3000


You’ll get a public URL like:

https://abcd1234.ngrok-free.app

🔌 Connect MCP Server to Claude Desktop
1️⃣ Install Claude Desktop

👉 https://claude.ai/download

2️⃣ Create MCP config file
📍 Windows
C:\Users\<your-username>\.claude\mcp.json

📍 macOS / Linux
~/.claude/mcp.json


Create the .claude folder if it doesn’t exist.

3️⃣ Add MCP server config
{
  "servers": {
    "my-node-mcp": {
      "transport": {
        "type": "http",
        "url": "https://abcd1234.ngrok-free.app/mcp"
      }
    }
  }
}


⚠️ Make sure:

URL is HTTPS

Ends with /mcp

ngrok + Node server are running

4️⃣ Restart Claude Desktop

Claude reads MCP config only on startup

🧪 Test in Claude Desktop

In Claude Desktop chat, type:

Call the hello tool


or

Add 5 and 7


If configured correctly, Claude will call your MCP server.

❌ Common Issues & Fixes
❌ “I don’t have access to tool hello”

✔ You are not using Claude Desktop
✔ MCP does NOT work in browser or Cursor

❌ ngrok authentication failed

✔ Replace $YOUR_AUTHTOKEN with the actual token
✔ Do not include $

❌ Tools not discovered

✔ Restart Claude Desktop
✔ Ensure tools are registered before /mcp route
✔ Check mcp.json path and JSON validity

🧠 Key Takeaways

MCP tools ≠ Claude Web connectors

MCP is Desktop-only

No UI exists to “add” custom MCP tools

Configuration is done via mcp.json

🚀 Next Improvements

Convert to STDIO MCP (no ngrok)

Add authentication

Connect databases (MongoDB/Postgres)

Deploy MCP server to cloud
