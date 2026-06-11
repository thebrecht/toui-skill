# Installing the toui MCP server

toui is a URL shortener with a remote MCP server.

1. Add an MCP server with URL `https://mcp.toui.io` (transport: streamable HTTP).
2. Authentication: OAuth (the agent opens a browser to authorize), OR a static
   header `Authorization: Bearer <toui_KEY>` using a `shorten`-scope key from
   https://toui.io/admin .
3. After connecting, the tool `shorten_url` is available. Call it with
   `{ "url": "https://example.com/long", "title": "optional" }`.

No other configuration is required.
