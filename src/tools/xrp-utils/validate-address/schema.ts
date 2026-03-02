import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { XrpUtilsNetwork } from "../base-schema.js";

/**
 * Validate Address - attributes for this action
 */
export const ValidateAddressAttributesSchema = z
    .object({
        network: XrpUtilsNetwork.describe("Network name: mainnet or testnet"),
        address: z.string().min(1).describe("Address to validate"),
    })
    .merge(RequestMetadataSchema);

export type ValidateAddressAttributes = z.infer<typeof ValidateAddressAttributesSchema>;

/**
 * Validate Address response (Utils XRP)
 */
export const ValidateAddressOutputSchema = z.object({}).passthrough();

export type ValidateAddressOutput = z.infer<typeof ValidateAddressOutputSchema>;
