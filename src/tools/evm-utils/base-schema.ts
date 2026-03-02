import * as z from "zod";

/**
 * Actions available for EVM Utils endpoints
 */
export const EvmUtilsAction = z.enum(["validate-address", "decode-raw-transaction"]);

/**
 * Supported EVM blockchains (Utils product)
 */
export const EvmUtilsBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
    "binance-smart-chain",
    "tron",
]);

/**
 * Supported EVM networks (Utils product)
 */
export const EvmUtilsNetwork = z.enum([
    "mainnet",
    "testnet",
    "mordor",
    "nile",
    "sepolia",
]);
