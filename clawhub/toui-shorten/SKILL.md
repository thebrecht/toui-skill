---
name: toui-shorten
description: 用 toui.io 縮短網址並查詢點擊統計。當使用者想把長網址變短、產生短連結／追蹤連結，或查詢某個 toui.io 短碼的點擊數時使用。
version: 1.0.0
metadata:
  openclaw:
    primaryEnv: TOUI_API_KEY
    envVars:
      - name: TOUI_API_KEY
        required: false
        description: 走 REST 直連（curl）時需要的 toui API key（shorten scope，到 https://toui.io/admin 建）。若已用「openclaw mcp add toui」(OAuth) 連線則不需要。
    requires:
      anyBins:
        - curl
    emoji: "🔗"
    homepage: https://toui.io
    os:
      - darwin
      - linux
---

# toui 縮網址（toui.io）

用 [toui.io](https://toui.io) 把長網址變短，並可查點擊統計。toui 也提供 LINE 與 Telegram 機器人。

## 兩種用法

### A. 透過 toui MCP server（推薦，免 API key）

若已連線 toui 的 MCP server，直接呼叫工具 `shorten_url`：

```
shorten_url({ "url": "<要縮的網址>", "title": "選填標題" })
```

回傳 `{ short_url, code, qr_url }`，把 `short_url` 交給使用者。

連線方式（一次性設定）：

```
openclaw mcp add toui --url https://mcp.toui.io --transport streamable-http --auth oauth
openclaw mcp login toui
```

> 注意：授權碼含冒號，從瀏覽器網址列複製 `code` 時要把 `%3A` 換回 `:` 再執行 `openclaw mcp login toui --code <code>`。

### B. 透過 REST API（需 TOUI_API_KEY）

沒走 MCP 時直接打 REST：

```
curl -X POST https://toui.io/api/v1/shorten \
  -H "Authorization: Bearer $TOUI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"<要縮的網址>","title":"選填"}'
```

回傳 JSON 含 `short_url`、`short_code`。到 <https://toui.io/admin> 建一把 `shorten` scope 的 key，設成環境變數 `TOUI_API_KEY`。

## 備註

- 登入帳號建立的短連結永久有效。
- 查點擊統計：MCP 工具僅建立（無 stats），REST 用 `GET https://toui.io/api/v1/urls/{code}/stats`（需 `full` scope key）。
- 自訂短碼、品牌網域、進階分析為付費方案功能。
