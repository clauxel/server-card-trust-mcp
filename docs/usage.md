# ServerCard Trust MCP Usage

## Endpoint

`https://servercardtrust.space/mcp`

Transport: Streamable HTTP.

## Headers

```http
Authorization: Bearer <token>
Content-Type: application/json
```

## Initialize

Use any MCP client that supports remote Streamable HTTP MCP servers. Configure the server URL as `https://servercardtrust.space/mcp` and pass the bearer token in the Authorization header.

## Token Flow

1. Open https://servercardtrust.space/pricing/?utm_source=github&utm_medium=directory&utm_campaign=sbl202605.
2. Choose a plan and complete checkout.
3. Claim the one-time MCP bearer token from the hosted claim flow.
4. Paste only the token value into your MCP client secret field.

## Capability Boundary

The server is intentionally read-only. It exposes fixed tools for MCP server-card validation; it does not expose arbitrary shell execution, arbitrary SQL, deployment controls, deletion tools, or payment-configuration edits.
