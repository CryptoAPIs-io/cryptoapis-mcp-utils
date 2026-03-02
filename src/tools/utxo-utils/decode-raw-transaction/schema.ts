import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { UtxoUtilsBlockchain, UtxoUtilsNetwork } from "../base-schema.js";

/**
 * Decode Raw Transaction - attributes for this action
 */
export const DecodeRawTransactionAttributesSchema = z
    .object({
        blockchain: UtxoUtilsBlockchain.describe("Blockchain protocol"),
        network: UtxoUtilsNetwork.describe("Network name"),
        rawTransactionHex: z.string().min(1).describe("Raw transaction hex to decode"),
    })
    .merge(RequestMetadataSchema);

export type DecodeRawTransactionAttributes = z.infer<
    typeof DecodeRawTransactionAttributesSchema
>;

/**
 * Decode Raw Transaction response (Utils UTXO)
 */
export const DecodeRawTransactionOutputSchema = z.object({}).passthrough();

export type DecodeRawTransactionOutput = z.infer<typeof DecodeRawTransactionOutputSchema>;
