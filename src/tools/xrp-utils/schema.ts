import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { XrpUtilsAction, XrpUtilsNetwork } from "./base-schema.js";
import { ValidateAddressOutputSchema } from "./validate-address/schema.js";
import { DecodeXAddressOutputSchema } from "./decode-x-address/schema.js";
import { EncodeXAddressOutputSchema } from "./encode-x-address/schema.js";

/**
 * Flat schema for XRP utils actions
 */
export const XrpUtilsToolSchema = z
    .object({
        action: XrpUtilsAction.describe("Action to perform"),
        network: XrpUtilsNetwork.describe("Network name: mainnet or testnet"),
        address: z.string().min(1).optional().describe("Address (required for validate-address)"),
        xAddress: z.string().min(1).optional().describe("X-Address (required for decode-x-address)"),
        classicAddress: z.string().min(1).optional().describe("Classic address (required for encode-x-address)"),
        addressTag: z.number().int().min(0).optional().describe("Destination tag (required for encode-x-address)"),
    })
    .merge(RequestMetadataSchema)
    .refine(
        (data) => {
            if (data.action === "validate-address") return data.address != null && data.address !== "";
            if (data.action === "decode-x-address") return data.xAddress != null && data.xAddress !== "";
            if (data.action === "encode-x-address") return data.classicAddress != null && data.classicAddress !== "" && data.addressTag != null;
            return true;
        },
        {
            message:
                "address required for validate-address; xAddress for decode-x-address; classicAddress and addressTag for encode-x-address",
            path: ["action"],
        }
    );

export type XrpUtilsInput = z.infer<typeof XrpUtilsToolSchema>;

// Re-export base schema
export { XrpUtilsAction, XrpUtilsNetwork } from "./base-schema.js";

// Re-export output schemas
export { ValidateAddressOutputSchema } from "./validate-address/schema.js";
export { DecodeXAddressOutputSchema } from "./decode-x-address/schema.js";
export { EncodeXAddressOutputSchema } from "./encode-x-address/schema.js";
