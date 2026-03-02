import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Blockchains supported by Utils derive-addresses (OpenAPI path /utils/{blockchain}/{network}/xpubs/.../derive-addresses)
 */
export const DeriveAddressesBlockchain = z.enum([
    "bitcoin",
    "bitcoin-cash",
    "litecoin",
    "dogecoin",
    "dash",
    "ethereum",
    "ethereum-classic",
    "xrp",
    "binance-smart-chain",
    "zcash",
    "tron",
]);

/**
 * Networks supported by derive-addresses (OpenAPI)
 */
export const DeriveAddressesNetwork = z.enum([
    "mainnet",
    "testnet",
    "mordor",
    "nile",
    "sepolia",
]);

export const DeriveAddressesToolSchema = z
    .object({
        blockchain: DeriveAddressesBlockchain.describe("Blockchain protocol"),
        network: DeriveAddressesNetwork.describe("Network name"),
        extendedPublicKey: z.string().min(1).describe("xPub/yPub/zPub for the HD wallet"),
        addressFormat: z
            .enum(["p2pkh", "p2sh", "p2wpkh", "standard", "p2sh-cash", "p2pkh-cash", "classic", "base58"])
            .optional()
            .describe("Address format"),
        addressesCount: z.number().int().min(1).max(10).optional().describe("Number of addresses to derive (up to 10)"),
        isChange: z.boolean().optional().describe("If true derive change address(es); if false derive receiving/deposit"),
        startIndex: z.number().int().min(0).optional().describe("Starting index for derivation"),
    })
    .merge(RequestMetadataSchema);

export type DeriveAddressesInput = z.infer<typeof DeriveAddressesToolSchema>;
