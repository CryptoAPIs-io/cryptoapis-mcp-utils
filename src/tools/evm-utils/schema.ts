import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { EvmUtilsAction, EvmUtilsBlockchain, EvmUtilsNetwork } from "./base-schema.js";
import { ValidateAddressOutputSchema } from "./validate-address/schema.js";
import { DecodeRawTransactionOutputSchema } from "./decode-raw-transaction/schema.js";

/**
 * Flat schema for EVM utils actions
 */
export const EvmUtilsToolSchema = z
    .object({
        action: EvmUtilsAction.describe("Action to perform"),
        blockchain: EvmUtilsBlockchain.describe("Blockchain protocol"),
        network: EvmUtilsNetwork.describe("Network name"),
        address: z.string().min(1).optional().describe("Address (required for validate-address)"),
        rawTransactionHex: z.string().min(1).optional().describe("Raw transaction hex (required for decode-raw-transaction)"),
    })
    .merge(RequestMetadataSchema);

export type EvmUtilsInput = z.infer<typeof EvmUtilsToolSchema>;

// Re-export base schema
export { EvmUtilsAction, EvmUtilsBlockchain, EvmUtilsNetwork } from "./base-schema.js";

// Re-export output schemas
export { ValidateAddressOutputSchema } from "./validate-address/schema.js";
export { DecodeRawTransactionOutputSchema } from "./decode-raw-transaction/schema.js";
