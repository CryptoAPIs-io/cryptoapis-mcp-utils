import * as z from "zod";

/**
 * Actions available for XRP Utils endpoints
 */
export const XrpUtilsAction = z.enum([
    "validate-address",
    "decode-x-address",
    "encode-x-address",
]);

/**
 * Supported XRP networks (Utils product)
 */
export const XrpUtilsNetwork = z.enum(["mainnet", "testnet"]);
