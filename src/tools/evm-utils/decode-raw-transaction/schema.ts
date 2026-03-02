import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { EvmUtilsBlockchain, EvmUtilsNetwork } from "../base-schema.js";

/**
 * Decode Raw Transaction - attributes for this action
 */
export const DecodeRawTransactionAttributesSchema = z
    .object({
        blockchain: EvmUtilsBlockchain.describe("Blockchain protocol"),
        network: EvmUtilsNetwork.describe("Network name"),
        rawTransactionHex: z.string().min(1).describe("Raw transaction hex to decode"),
    })
    .merge(RequestMetadataSchema);

export type DecodeRawTransactionAttributes = z.infer<
    typeof DecodeRawTransactionAttributesSchema
>;

/**
 * Decode Raw Transaction response (Utils EVM)
 */
export const DecodeRawTransactionOutputSchema = z.object({}).passthrough();

export type DecodeRawTransactionOutput = z.infer<typeof DecodeRawTransactionOutputSchema>;
