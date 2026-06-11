# Listing submissions — copy-paste reference

Ready-to-paste content for the external listing steps. Repo: `https://github.com/thebrecht/toui-skill`. MCP server: `https://mcp.toui.io` (Streamable HTTP, OAuth 2.1 + Bearer). Logo: `assets/logo-400.png` (400×400 PNG).

> Public/English-facing descriptions below mention **Telegram only, never LINE** (per project copy rule). LINE belongs only in the zh ClawHub skill.

---

## 1. Smithery — smithery.ai

Hosted remote servers are listed by submitting the URL (no `smithery.yaml`). UI: `smithery.ai/new` — **Namespace `toui-io` / Server ID `url-shortener`** (full id `toui-io/url-shortener`, consistent with our official MCP Registry namespace `io.toui/url-shortener`; Server ID must be 3-39 chars, letters/numbers/hyphens/underscores only — no dots). CLI: `npx @smithery/cli@latest mcp publish "https://mcp.toui.io" -n toui-io/url-shortener` (confirm exact flags in their current UI).

- **Name:** toui — URL shortener
- **Tagline (≤ ~60 chars):** Shorten URLs and read click stats from your AI agent
- **Server URL:** `https://mcp.toui.io`
- **Description:**
  > toui is a URL shortener with a remote MCP server. The `shorten_url` tool turns any long link into a short toui.io link — no leaving your chat, no API key (OAuth). Permanent links, custom branded domains, and click analytics are available on the toui.io account. Works in Claude, ChatGPT, Cursor, Cline, and any MCP-capable agent.
- **✅ PUBLISHED 2026-06-11** — `toui-io/url-shortener`, Quality 90/100, discoverable via `npx @smithery/cli@latest mcp search "url shortener"` (shows alongside Bitly + Dub.co). Gateway connect URL: `https://server.smithery.ai/toui-io/url-shortener`.
- **Install command is `mcp add`, NOT `skill add`** (ours is an MCP *server*, not a Smithery "skill"): `npx @smithery/cli@latest mcp add toui-io/url-shortener` — or paste `https://server.smithery.ai/toui-io/url-shortener` into the client.
- **Remaining smoke (interactive, [USER]):** run `mcp add` and complete the browser OAuth to confirm the dance works *through* Smithery's gateway, then call `shorten_url`. If OAuth stalls through the gateway, add an optional Bearer-key parameter (Settings → Add Parameter) and re-publish.
- _(Note: Quality score's "Output schemas 0/1" is a Smithery scorer quirk — the deployed `shorten_url` tool does declare `outputSchema`, verified in the worker bundle. Not worth chasing.)_

---

## 2. Cline MCP Marketplace

Open the submission issue: <https://github.com/cline/mcp-marketplace/issues/new?template=mcp-server-submission.yml>

- **GitHub Repo URL:** `https://github.com/thebrecht/toui-skill`
- **Logo Image:** attach `assets/logo-400.png` (400×400 PNG)
- **Reason for Addition:**
  > toui lets users shorten URLs and read click stats directly from Cline. It's a hosted remote MCP server (`https://mcp.toui.io`) with OAuth — no install or local build, just add the URL. The README and `llms-install.md` let Cline self-configure the connection.
- **Before submitting:** paste the contents of `llms-install.md` to Cline and confirm it connects to `https://mcp.toui.io` and the `shorten_url` tool works. Tick the "I tested README/llms-install setup" box.

---

## 3. cursor.directory

Submit at `cursor.directory/plugins/new` (sign in, paste repo URL). Repo is public/open-source ✓. Manual review + automated security scan precede listing.

- **Repo URL:** `https://github.com/thebrecht/toui-skill`
- **Short description:** Shorten URLs and read click analytics from Cursor via toui.io's MCP server (OAuth, no API key).

---

## 4. OpenClaw (smoke) → ClawHub (publish)

**Smoke first** (this gates the ClawHub publish):

```bash
openclaw mcp add toui --url https://mcp.toui.io --transport streamable-http --auth oauth
openclaw mcp doctor --probe
```

- If the OAuth probe passes → ask the toui.io maintainer (me) to author the thin zh ClawHub skill (LINE allowed in zh), then `clawhub login && clawhub skill publish ...`.
- If OAuth fails in OpenClaw's client → fall back to a Bearer add (`--header "Authorization: Bearer toui_<shorten-scope-key>"`) and record the OAuth gap as a follow-up. Do NOT publish "works with OpenClaw via OAuth" copy until the probe passes.

> The ClawHub skill file is intentionally NOT authored yet — its instructions depend on whether the smoke lands on OAuth or Bearer.

---

## 5. Live skill smoke (any time)

```bash
# create a full-scope key at https://toui.io/admin, then:
export TOUI_API_KEY=toui_xxxxxxxx
node scripts/shorten.mjs shorten https://example.com "test"
node scripts/shorten.mjs stats <short_code> 7
```
