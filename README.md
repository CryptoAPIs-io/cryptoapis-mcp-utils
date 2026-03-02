# @cryptoapis-io/mcp-utils

MCP server for [Crypto APIs](https://cryptoapis.io/) Utils product. Validate addresses, decode raw transactions, and XRP X-Address encode/decode.

> **API Version:** Compatible with Crypto APIs version **2024-12-12**

## Features

- **UTXO utils:** Validate address, decode raw transaction hex (bitcoin, bitcoin-cash, litecoin, dogecoin, dash, zcash)
- **EVM utils:** Validate address, decode raw transaction hex
- **XRP utils:** Validate address, decode X-Address, encode X-Address
- **Derive addresses:** Derive HD wallet (xPub/yPub/zPub) change or receiving addresses without syncing

## Prerequisites

1. [Register at Crypto APIs](https://app.cryptoapis.io/signup)
2. [Generate an API key](https://app.cryptoapis.io/api-keys)

## Installation

```bash
npm install @cryptoapis-io/mcp-utils
```

Or install all Crypto APIs MCP servers: `npm install @cryptoapis-io/mcp`

## Usage

```bash
# Run with API key
npx @cryptoapis-io/mcp-utils --api-key YOUR_API_KEY

# Or use environment variable
export CRYPTOAPIS_API_KEY=YOUR_API_KEY
npx @cryptoapis-io/mcp-utils

# HTTP transport
npx @cryptoapis-io/mcp-utils --transport http --port 3000 --api-key YOUR_API_KEY
```

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "cryptoapis-utils": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-utils"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "cryptoapis-utils": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-utils"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### MCP Inspector

```bash
npx @modelcontextprotocol/inspector npx @cryptoapis-io/mcp-utils --api-key YOUR_API_KEY
```

### n8n

1. Start the server in HTTP mode:
   ```bash
   npx @cryptoapis-io/mcp-utils --transport http --port 3000 --api-key YOUR_API_KEY
   ```
2. In your n8n workflow, add an **AI Agent** node
3. Under **Tools**, add an **MCP Client Tool** and set the URL to `http://localhost:3000/mcp`

> All servers default to port 3000. Use `--port` to assign different ports when running multiple servers.

## Available Tools

### `utxo_utils`

| Action | Description |
|--------|-------------|
| `validate-address` | Check if a UTXO address is valid. Requires blockchain, network, address |
| `decode-raw-transaction` | Decode a raw transaction hex. Requires blockchain, network, rawTransactionHex |
| `convert-bitcoin-cash-address` | Convert Bitcoin Cash address between legacy and CashAddr formats. Requires network, address (Bitcoin Cash only, no blockchain parameter) |

**Supported Blockchains:** bitcoin, bitcoin-cash, litecoin, dogecoin, dash, zcash

### `evm_utils`

| Action | Description |
|--------|-------------|
| `validate-address` | Check if an EVM address is valid. Requires blockchain, network, address |
| `decode-raw-transaction` | Decode a raw transaction hex. Requires blockchain, network, rawTransactionHex |

### `xrp_utils`

| Action | Description |
|--------|-------------|
| `validate-address` | Check if an XRP address is valid. Requires network, address |
| `decode-x-address` | Decode X-Address to classic address and tag. Requires network, xAddress |
| `encode-x-address` | Encode classic address and tag to X-Address. Requires network, classicAddress, addressTag |

### `derive_addresses`

Derive HD wallet (xPub/yPub/zPub) change or receiving addresses without syncing. Derives up to 10 addresses per call.

| Parameter | Description |
|-----------|-------------|
| `blockchain` | Target blockchain |
| `network` | Network name |
| `extendedPublicKey` | xPub/yPub/zPub for the HD wallet |
| `addressFormat` | Address format (optional): p2pkh, p2sh, p2wpkh, standard, p2sh-cash, p2pkh-cash, classic, base58 |
| `addressesCount` | Number of addresses to derive, up to 10 (optional) |
| `isChange` | If true, derive change address(es); if false, derive receiving/deposit (optional, UTXO only) |
| `startIndex` | Starting index for derivation (optional) |

**Supported Blockchains:** bitcoin, bitcoin-cash, litecoin, dogecoin, dash, zcash, ethereum, ethereum-classic, binance-smart-chain, xrp, tron

## CLI Arguments

| Argument | Description | Default |
|----------|-------------|---------|
| `--api-key` | Crypto APIs API key | `CRYPTOAPIS_API_KEY` env var |
| `--transport` | Transport type: `stdio` or `http` | `stdio` |
| `--host` | HTTP host | `0.0.0.0` |
| `--port` | HTTP port | `3000` |
| `--path` | HTTP path | `/mcp` |
| `--stateless` | Enable stateless HTTP mode | `false` |

### HTTP API Key Modes

When using HTTP transport, the server supports two API key modes:

- **With `--api-key`:** The key is used for all requests. `x-api-key` request headers are ignored.
- **Without `--api-key`:** Each request must include an `x-api-key` header with a valid Crypto APIs key. This enables hosting a public server where each user provides their own key.

```bash
# Per-request key mode (multi-tenant)
npx @cryptoapis-io/mcp-utils --transport http --port 3000
# Clients send x-api-key header with each request
```

> Stdio transport always requires an API key at startup.

## Important: API Key Required

> **Warning:** Making requests without a valid API key — or with an incorrect one — may result in your IP being banned from the Crypto APIs ecosystem. Always ensure a valid API key is configured before starting any server.

## Hosted MCP Server

Crypto APIs provides an official hosted MCP server with all tools available via HTTP Streamable transport at [https://ai.cryptoapis.io/mcp](https://ai.cryptoapis.io/mcp). Pass your API key via the `x-api-key` header — no installation required.

## License

MIT

