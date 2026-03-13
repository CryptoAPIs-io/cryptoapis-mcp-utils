import type { CryptoApisHttpClient, McpLogger, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { EvmUtilsToolSchema, type EvmUtilsInput } from "./schema.js";
import { handleValidateAddress } from "./validate-address/index.js";
import { credits as validateAddressCredits } from "./validate-address/credits.js";
import { handleDecodeRawTransaction } from "./decode-raw-transaction/index.js";
import { credits as decodeRawTransactionCredits } from "./decode-raw-transaction/credits.js";

const EVM_UTILS_DESCRIPTION = `EVM utils (Utils product): validate address, decode raw transaction hex.

Actions:
• validate-address: Check if an EVM address is valid
• decode-raw-transaction: Decode a raw transaction hex

Blockchain → Networks:
• ethereum: mainnet, sepolia
• ethereum-classic: mainnet, mordor
• binance-smart-chain: mainnet, testnet
• tron: mainnet, nile`;

export const evmUtilsTool: McpToolDef<typeof EvmUtilsToolSchema> = {
    name: "evm_utils",
    description: EVM_UTILS_DESCRIPTION,
    credits: {
        "validate-address": validateAddressCredits,
        "decode-raw-transaction": decodeRawTransactionCredits,
    },
    inputSchema: EvmUtilsToolSchema,
    handler:
        (client: CryptoApisHttpClient, logger: McpLogger) =>
        async (input: EvmUtilsInput) => {
            let result: RequestResult<unknown>;

            const baseParams = {
                blockchain: input.blockchain,
                network: input.network,
                context: input.context,
            };

            switch (input.action) {
                case "validate-address":
                    if (!input.address) throw new Error("address is required for validate-address");
                    result = await handleValidateAddress(client, {
                        ...baseParams,
                        address: input.address,
                    });
                    break;
                case "decode-raw-transaction":
                    if (!input.rawTransactionHex) throw new Error("rawTransactionHex is required for decode-raw-transaction");
                    result = await handleDecodeRawTransaction(client, {
                        ...baseParams,
                        rawTransactionHex: input.rawTransactionHex,
                    });
                    break;
                default:
                    throw new Error(`Unknown action: ${(input as any).action}`);
            }

            logger.logInfo({
                tool: "evm_utils",
                action: input.action,
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

export { EvmUtilsToolSchema, type EvmUtilsInput } from "./schema.js";
