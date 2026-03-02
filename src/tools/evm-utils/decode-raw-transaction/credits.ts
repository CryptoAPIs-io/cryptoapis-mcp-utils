import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI). Utils EVM decode raw transaction. */
export const credits: CreditsPerBlockchain = {
    ethereum: 10,
    "ethereum-classic": 13,
    "binance-smart-chain": 25,
    tron: 15,
};
