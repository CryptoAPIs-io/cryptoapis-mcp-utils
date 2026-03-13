import type { CryptoApisHttpClient, McpLogger, RequestResult } from "@cryptoapis-io/mcp-shared";
import { UTXO_BLOCKCHAIN_NETWORK_DESCRIPTION } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { UtxoUtilsToolSchema, type UtxoUtilsInput } from "./schema.js";
import { handleValidateAddress } from "./validate-address/index.js";
import { credits as validateAddressCredits } from "./validate-address/credits.js";
import { handleDecodeRawTransaction } from "./decode-raw-transaction/index.js";
import { credits as decodeRawTransactionCredits } from "./decode-raw-transaction/credits.js";
import { handleConvertBitcoinCashAddress } from "./convert-bitcoin-cash-address/index.js";
import { credits as convertBitcoinCashAddressCredits } from "./convert-bitcoin-cash-address/credits.js";

export const utxoUtilsTool: McpToolDef<typeof UtxoUtilsToolSchema> = {
    name: "utxo_utils",
    description: `UTXO utils (Utils product): validate address, decode raw transaction hex, convert Bitcoin Cash address.

Actions:
• validate-address: Check if a UTXO address is valid
• decode-raw-transaction: Decode a raw transaction hex
• convert-bitcoin-cash-address: Convert Bitcoin Cash address (legacy ↔ cash format); Bitcoin Cash only, no blockchain parameter (network + address)

${UTXO_BLOCKCHAIN_NETWORK_DESCRIPTION}`,
    credits: {
        "validate-address": validateAddressCredits,
        "decode-raw-transaction": decodeRawTransactionCredits,
        "convert-bitcoin-cash-address": convertBitcoinCashAddressCredits,
    },
    inputSchema: UtxoUtilsToolSchema,
    handler:
        (client: CryptoApisHttpClient, logger: McpLogger) =>
        async (input: UtxoUtilsInput) => {
            let result: RequestResult<unknown>;

            switch (input.action) {
                case "validate-address":
                    if (!input.blockchain) throw new Error("blockchain is required for validate-address");
                    if (!input.address) throw new Error("address is required for validate-address");
                    result = await handleValidateAddress(client, {
                        blockchain: input.blockchain,
                        network: input.network,
                        address: input.address,
                        context: input.context,
                    });
                    break;
                case "decode-raw-transaction":
                    if (!input.blockchain) throw new Error("blockchain is required for decode-raw-transaction");
                    if (!input.rawTransactionHex) throw new Error("rawTransactionHex is required for decode-raw-transaction");
                    result = await handleDecodeRawTransaction(client, {
                        blockchain: input.blockchain,
                        network: input.network,
                        rawTransactionHex: input.rawTransactionHex,
                        context: input.context,
                    });
                    break;
                case "convert-bitcoin-cash-address":
                    if (!input.address) throw new Error("address is required for convert-bitcoin-cash-address");
                    result = await handleConvertBitcoinCashAddress(client, {
                        network: input.network,
                        address: input.address,
                        context: input.context,
                    });
                    break;
                default:
                    throw new Error(`Unknown action: ${(input as any).action}`);
            }

            logger.logInfo({
                tool: "utxo_utils",
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

export { UtxoUtilsToolSchema, type UtxoUtilsInput } from "./schema.js";
