# Smithery listing

toui's MCP server is **already hosted** by toui at `https://mcp.toui.io`
(Streamable HTTP, OAuth). It is not built or deployed by Smithery.

Per the current Smithery docs (primary source, fetched 2026-06-11):

- `smithery.yaml` is for servers that **Smithery builds and hosts** — it
  describes how to *start* your application (HTTP or STDIO `runtime`), and
  Smithery routes traffic to `/mcp` under a `PORT` env var. It does **not**
  register an already-running external URL.
  Source: <https://smithery.ai/docs/build/project-config/smithery.yaml>
- An already-hosted remote MCP server is listed by **submitting its URL** at
  <https://smithery.ai/new>, or via the CLI:

  ```
  smithery mcp publish "https://mcp.toui.io" -n @thebrecht/toui
  ```

  Source: <https://smithery.ai/docs/build/publish>

Because toui's server is externally hosted, **no `smithery.yaml` is required
or applicable** — the listing is done via URL submission (the [USER] publish
step). A `smithery.yaml` was intentionally NOT written rather than inventing
fields that do not match the remote-URL listing path.
