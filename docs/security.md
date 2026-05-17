# ServerCard Trust MCP Security Notes

## Auth

ServerCard Trust MCP requires a bearer token. Treat it as a secret. Never paste it into public GitHub issues, PRs, screenshots, chat logs, or analytics events.

## Data Boundary

The hosted MCP endpoint is scoped to ServerCard Trust MCP and its product data. It should not be used as a generic crawler, SQL runner, deployment controller, or cross-site data reader.

## Safe Client Configuration

- Store the token in your MCP client's secret store when available.
- Use the exact endpoint `https://servercardtrust.space/mcp`.
- Review tool names and descriptions before giving an agent broad autonomy.
- Rotate or revoke tokens if they are exposed.

## Reporting Issues

Open a GitHub issue in this repository for documentation or listing problems. Do not include credentials or private customer data.
