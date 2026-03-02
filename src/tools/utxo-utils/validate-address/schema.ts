import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { UtxoUtilsBlockchain, UtxoUtilsNetwork } from "../base-schema.js";

/**
 * Validate Address - attributes for this action
 */
export const ValidateAddressAttributesSchema = z
    .object({
        blockchain: UtxoUtilsBlockchain.describe("Blockchain protocol"),
        network: UtxoUtilsNetwork.describe("Network name"),
        address: z.string().min(1).describe("Address to validate"),
    })
    .merge(RequestMetadataSchema);

export type ValidateAddressAttributes = z.infer<typeof ValidateAddressAttributesSchema>;

/**
 * Validate Address response (Utils UTXO)
 */
export const ValidateAddressOutputSchema = z.object({}).passthrough();

export type ValidateAddressOutput = z.infer<typeof ValidateAddressOutputSchema>;
