# Website Changelog
## 2026-06-17 - Hotword overlay split

- Added independent Cloudflare Worker + Assets hotword pages for servercardtrust.space.
- Routes are scoped to the new intent pages plus sitemap, robots, and llms so existing homepage, checkout, API, and MCP behavior remain with the current production Worker.
- New pages: /mcp-server-card/, /server-card-validation/, /mcp-trust-center/.

