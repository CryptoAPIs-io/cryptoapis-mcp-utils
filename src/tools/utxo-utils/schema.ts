import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { UtxoUtilsAction, UtxoUtilsBlockchain, UtxoUtilsNetwork } from "./base-schema.js";
import { ValidateAddressOutputSchema } from "./validate-address/schema.js";
import { DecodeRawTransactionOutputSchema } from "./decode-raw-transaction/schema.js";

/**
 * Flat schema for UTXO utils actions.
 * blockchain is required only for validate-address and decode-raw-transaction.
 * convert-bitcoin-cash-address is Bitcoin Cash only and does not take blockchain.
 */
export const UtxoUtilsToolSchema = z
    .object({
        action: UtxoUtilsAction.describe("Action to perform"),
        blockchain: UtxoUtilsBlockchain.optional().describe("Blockchain protocol (required for validate-address and decode-raw-transaction)"),
        network: UtxoUtilsNetwork.describe("Network name"),
        address: z.string().min(1).optional().describe("Address (required for validate-address and convert-bitcoin-cash-address)"),
        rawTransactionHex: z.string().min(1).optional().describe("Raw transaction hex (required for decode-raw-transaction)"),
    })
    .merge(RequestMetadataSchema);

export type UtxoUtilsInput = z.infer<typeof UtxoUtilsToolSchema>;

// Re-export base schema
export { UtxoUtilsAction, UtxoUtilsBlockchain, UtxoUtilsNetwork } from "./base-schema.js";

// Re-export output schemas
export { ValidateAddressOutputSchema } from "./validate-address/schema.js";
export { DecodeRawTransactionOutputSchema } from "./decode-raw-transaction/schema.js";
