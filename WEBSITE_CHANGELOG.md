# Website Changelog

## 2026-06-17 - Dedicated production Worker

- Promoted the hotword Worker to handle `servercardtrust.space/*` and `www.servercardtrust.space/*`.
- Kept paid MCP/API behavior available by proxying `/api/*` and `/mcp*` to the legacy Pages origin.
- Added full-domain canonical redirects, production security headers, public path allow-listing, and noindex 404s for non-public URLs.
- Published root-level `server-card.json` and `server.json` alongside `.well-known/mcp/server-card.json`.
- Updated robots output so checkout and success pages are disallowed while public trust pages remain crawlable.

## 2026-06-17 - Hotword overlay split

- Added independent Cloudflare Worker + Assets hotword pages for servercardtrust.space.
- Routes are scoped to the new intent pages plus sitemap, robots, and llms so existing homepage, checkout, API, and MCP behavior remain with the current production Worker.
- New pages: /mcp-server-card/, /server-card-validation/, /mcp-trust-center/.
