import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { XrpUtilsNetwork } from "../base-schema.js";

/**
 * Encode X-Address - attributes for this action
 */
export const EncodeXAddressAttributesSchema = z
    .object({
        network: XrpUtilsNetwork.describe("Network name: mainnet or testnet"),
        classicAddress: z.string().min(1).describe("Classic address to encode"),
        addressTag: z.number().int().min(0).describe("Destination tag (integer)"),
    })
    .merge(RequestMetadataSchema);

export type EncodeXAddressAttributes = z.infer<typeof EncodeXAddressAttributesSchema>;

/**
 * Encode X-Address response (Utils XRP)
 */
export const EncodeXAddressOutputSchema = z.object({}).passthrough();

export type EncodeXAddressOutput = z.infer<typeof EncodeXAddressOutputSchema>;
