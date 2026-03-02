import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { XrpUtilsToolSchema, type XrpUtilsInput } from "./schema.js";
import { handleValidateAddress } from "./validate-address/index.js";
import { credits as validateAddressCredits } from "./validate-address/credits.js";
import { handleDecodeXAddress } from "./decode-x-address/index.js";
import { credits as decodeXAddressCredits } from "./decode-x-address/credits.js";
import { handleEncodeXAddress } from "./encode-x-address/index.js";
import { credits as encodeXAddressCredits } from "./encode-x-address/credits.js";

const XRP_UTILS_DESCRIPTION = `XRP utils (Utils product): validate address, decode/encode X-Address.

Actions:
• validate-address: Check if an XRP address is valid
• decode-x-address: Decode X-Address to classic address and tag
• encode-x-address: Encode classic address and tag to X-Address

Networks: mainnet, testnet`;

export const xrpUtilsTool: McpToolDef<typeof XrpUtilsToolSchema> = {
    name: "xrp_utils",
    description: XRP_UTILS_DESCRIPTION,
    credits: {
        "validate-address": validateAddressCredits,
        "decode-x-address": decodeXAddressCredits,
        "encode-x-address": encodeXAddressCredits,
    },
    inputSchema: XrpUtilsToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: XrpUtilsInput) => {
            let result: RequestResult<unknown>;

            const baseParams = { network: input.network, context: input.context };

            switch (input.action) {
                case "validate-address":
                    result = await handleValidateAddress(client, {
                        ...baseParams,
                        address: input.address!,
                    });
                    break;
                case "decode-x-address":
                    result = await handleDecodeXAddress(client, {
                        ...baseParams,
                        xAddress: input.xAddress!,
                    });
                    break;
                case "encode-x-address":
                    result = await handleEncodeXAddress(client, {
                        ...baseParams,
                        classicAddress: input.classicAddress!,
                        addressTag: input.addressTag!,
                    });
                    break;
            }

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

export { XrpUtilsToolSchema, type XrpUtilsInput } from "./schema.js";
