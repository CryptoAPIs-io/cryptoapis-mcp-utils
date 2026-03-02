import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI). Utils UTXO decode raw transaction. */
export const credits: CreditsPerBlockchain = {
    bitcoin: 10,
    "bitcoin-cash": 12,
    dash: 11,
    dogecoin: 11,
    litecoin: 11,
    zcash: 13,
};
