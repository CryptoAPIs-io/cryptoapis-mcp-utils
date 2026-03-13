import type { SupportedChainsResource } from "@cryptoapis-io/mcp-shared";

const EVM_BLOCKCHAINS = [
    "ethereum",
    "ethereum-classic",
    "binance-smart-chain",
    "tron",
] as const;

const UTXO_BLOCKCHAINS = [
    "bitcoin",
    "bitcoin-cash",
    "litecoin",
    "dogecoin",
    "dash",
    "zcash",
] as const;

const DERIVE_BLOCKCHAINS = [
    "bitcoin",
    "bitcoin-cash",
    "litecoin",
    "dogecoin",
    "dash",
    "zcash",
    "ethereum",
    "ethereum-classic",
    "xrp",
    "binance-smart-chain",
    "tron",
] as const;

/**
 * Supported chains resource data for the utils package.
 *
 * - evm_utils: validate-address, decode-raw-transaction
 * - utxo_utils: validate-address, decode-raw-transaction, convert-bitcoin-cash-address
 * - xrp_utils: validate-address, decode-x-address, encode-x-address
 * - derive_addresses: derive HD wallet addresses (cross-family)
 */
export const supportedChains: SupportedChainsResource = {
    evm: {
        blockchains: EVM_BLOCKCHAINS,
        networks: {
            ethereum: ["mainnet", "sepolia"],
            "ethereum-classic": ["mainnet", "mordor"],
            "binance-smart-chain": ["mainnet", "testnet"],
            tron: ["mainnet", "nile"],
        },
        actions: {
            "validate-address": [...EVM_BLOCKCHAINS],
            "decode-raw-transaction": [...EVM_BLOCKCHAINS],
        },
    },
    utxo: {
        blockchains: UTXO_BLOCKCHAINS,
        networks: {
            bitcoin: ["mainnet", "testnet"],
            "bitcoin-cash": ["mainnet", "testnet"],
            litecoin: ["mainnet", "testnet"],
            dogecoin: ["mainnet", "testnet"],
            dash: ["mainnet", "testnet"],
            zcash: ["mainnet", "testnet"],
        },
        actions: {
            "validate-address": [...UTXO_BLOCKCHAINS],
            "decode-raw-transaction": [...UTXO_BLOCKCHAINS],
            "convert-bitcoin-cash-address": ["bitcoin-cash"],
        },
    },
    xrp: {
        blockchains: ["xrp"],
        networks: {
            xrp: ["mainnet", "testnet"],
        },
        actions: {
            "validate-address": ["xrp"],
            "decode-x-address": ["xrp"],
            "encode-x-address": ["xrp"],
        },
    },
    "derive-addresses": {
        blockchains: DERIVE_BLOCKCHAINS,
        networks: {
            bitcoin: ["mainnet", "testnet"],
            "bitcoin-cash": ["mainnet", "testnet"],
            litecoin: ["mainnet", "testnet"],
            dogecoin: ["mainnet", "testnet"],
            dash: ["mainnet", "testnet"],
            zcash: ["mainnet", "testnet"],
            ethereum: ["mainnet", "sepolia"],
            "ethereum-classic": ["mainnet", "mordor"],
            xrp: ["mainnet", "testnet"],
            "binance-smart-chain": ["mainnet", "testnet"],
            tron: ["mainnet", "nile"],
        },
        actions: {
            "derive-addresses": [...DERIVE_BLOCKCHAINS],
        },
    },
};
