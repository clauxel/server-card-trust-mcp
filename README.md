# ServerCard Trust MCP

Paid remote MCP for server-card validation, auth checks, trust packets, and readiness.

## Connect

- Website: https://servercardtrust.space/?utm_source=github&utm_medium=directory&utm_campaign=sbl202605
- MCP endpoint: https://servercardtrust.space/mcp
- Server card: https://servercardtrust.space/.well-known/mcp/server-card.json
- Official Registry name: `space.servercardtrust/servercardtrust-mcp`

This is a hosted Streamable HTTP MCP server. It requires an Authorization bearer token issued after checkout and token claim.

## What It Does

ServerCard Trust MCP exposes a fixed, read-only tool surface for MCP server-card validation. It is designed for agent workflows that need a hosted MCP endpoint with explicit auth, public discovery metadata, and clear data boundaries.

## Authentication

Send the paid MCP token as:

```http
Authorization: Bearer <token>
```

The token is issued by the product checkout and MCP token claim flow. Do not put tokens in issues, pull requests, logs, or screenshots.

## Files

- [server.json](./server.json) - MCP Registry descriptor.
- [Usage guide](./docs/usage.md) - setup and request examples.
- [Security notes](./docs/security.md) - auth, data boundaries, and safe-use expectations.
- [llms.txt](./llms.txt) - short machine-readable discovery summary.

## Related Workflow

- [OpenHuman Online](https://openhuman.online/?utm_source=github&utm_medium=readme&utm_campaign=openhuman_public_repos&utm_content=server_card_trust_mcp) is useful when this MCP rollout also needs human-readable source memory, meeting notes, or approval context outside the server.

## Status

This public repository is a docs-only distribution package for directory review and MCP discovery. The hosted server runs at https://servercardtrust.space/mcp.
