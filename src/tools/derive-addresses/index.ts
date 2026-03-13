import type { CryptoApisHttpClient, McpLogger, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { DeriveAddressesToolSchema, type DeriveAddressesInput } from "./schema.js";
import { deriveAddresses } from "../../api/derive-addresses/index.js";
import { credits as deriveAddressesCredits } from "./credits.js";

export const deriveAddressesTool: McpToolDef<typeof DeriveAddressesToolSchema> = {
    name: "derive_addresses",
    description: `Utils: derive HD wallet (xPub, yPub, zPub) change or receiving addresses without syncing.

GET /utils/{blockchain}/{network}/xpubs/{extendedPublicKey}/derive-addresses
Derives up to 10 addresses. By default creates receiving/deposit address; set isChange=true for change address (UTXO only).`,
    credits: deriveAddressesCredits,
    inputSchema: DeriveAddressesToolSchema,
    handler:
        (client: CryptoApisHttpClient, logger: McpLogger) =>
        async (input: DeriveAddressesInput): Promise<{ content: Array<{ type: "text"; text: string }> }> => {
            const result: RequestResult<unknown> = await deriveAddresses(client, {
                blockchain: input.blockchain,
                network: input.network,
                extendedPublicKey: input.extendedPublicKey,
                addressFormat: input.addressFormat,
                addressesCount: input.addressesCount,
                isChange: input.isChange,
                startIndex: input.startIndex,
                context: input.context,
            });

            logger.logInfo({
                tool: "derive_addresses",
                blockchain: input.blockchain,
                network: input.network,
                creditsConsumed: result.creditsConsumed,
                creditsAvailable: result.creditsAvailable,
                responseTime: result.responseTime,
                throughputUsage: result.throughputUsage,
            });

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            ...(result.data as object),
                            creditsConsumed: result.creditsConsumed,
                            creditsAvailable: result.creditsAvailable,
                            responseTime: result.responseTime,
                            throughputUsage: result.throughputUsage,
                        }),
                    },
                ],
            };
        },
};

export { DeriveAddressesToolSchema, type DeriveAddressesInput } from "./schema.js";
