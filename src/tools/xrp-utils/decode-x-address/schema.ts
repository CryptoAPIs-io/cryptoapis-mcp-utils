import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { XrpUtilsNetwork } from "../base-schema.js";

/**
 * Decode X-Address - attributes for this action
 */
export const DecodeXAddressAttributesSchema = z
    .object({
        network: XrpUtilsNetwork.describe("Network name: mainnet or testnet"),
        xAddress: z.string().min(1).describe("X-Address to decode (encoded classic address with tag)"),
    })
    .merge(RequestMetadataSchema);

export type DecodeXAddressAttributes = z.infer<typeof DecodeXAddressAttributesSchema>;

/**
 * Decode X-Address response (Utils XRP)
 */
export const DecodeXAddressOutputSchema = z.object({}).passthrough();

export type DecodeXAddressOutput = z.infer<typeof DecodeXAddressOutputSchema>;
