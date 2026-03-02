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
    .merge(RequestMetadataSchema)
    .refine(
        (data) => {
            if (data.action === "validate-address") return data.address != null && data.address !== "";
            if (data.action === "decode-raw-transaction") return data.rawTransactionHex != null && data.rawTransactionHex !== "";
            return true;
        },
        {
            message: "address required for validate-address; rawTransactionHex required for decode-raw-transaction",
            path: ["action"],
        }
    );

export type EvmUtilsInput = z.infer<typeof EvmUtilsToolSchema>;

// Re-export base schema
export { EvmUtilsAction, EvmUtilsBlockchain, EvmUtilsNetwork } from "./base-schema.js";

// Re-export output schemas
export { ValidateAddressOutputSchema } from "./validate-address/schema.js";
export { DecodeRawTransactionOutputSchema } from "./decode-raw-transaction/schema.js";
