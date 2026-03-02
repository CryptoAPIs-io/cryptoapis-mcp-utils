import * as z from "zod";

/**
 * Actions available for UTXO Utils endpoints
 */
export const UtxoUtilsAction = z.enum([
    "validate-address",
    "decode-raw-transaction",
    "convert-bitcoin-cash-address",
]);

/**
 * Supported UTXO blockchains (Utils product)
 */
export const UtxoUtilsBlockchain = z.enum([
    "bitcoin",
    "bitcoin-cash",
    "litecoin",
    "dogecoin",
    "dash",
    "zcash",
]);

/**
 * Supported UTXO networks (Utils product)
 */
export const UtxoUtilsNetwork = z.enum(["mainnet", "testnet"]);
