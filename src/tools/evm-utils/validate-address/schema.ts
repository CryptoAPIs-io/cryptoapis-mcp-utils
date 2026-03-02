import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { EvmUtilsBlockchain, EvmUtilsNetwork } from "../base-schema.js";

/**
 * Validate Address - attributes for this action
 */
export const ValidateAddressAttributesSchema = z
    .object({
        blockchain: EvmUtilsBlockchain.describe("Blockchain protocol"),
        network: EvmUtilsNetwork.describe("Network name"),
        address: z.string().min(1).describe("Address to validate"),
    })
    .merge(RequestMetadataSchema);

export type ValidateAddressAttributes = z.infer<typeof ValidateAddressAttributesSchema>;

/**
 * Validate Address response (Utils EVM)
 */
export const ValidateAddressOutputSchema = z.object({}).passthrough();

export type ValidateAddressOutput = z.infer<typeof ValidateAddressOutputSchema>;
