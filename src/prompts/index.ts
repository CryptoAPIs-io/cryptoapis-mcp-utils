import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { formatSupportedChains } from "@cryptoapis-io/mcp-shared";
import { supportedChains } from "../resources/supported-chains.js";

export function registerPrompts(server: McpServer): void {
    server.registerPrompt(
        "derive-addresses",
        {
            description: "Derive HD wallet addresses from an extended public key",
            argsSchema: {
                blockchain: z.string().describe("Blockchain protocol (e.g. bitcoin, ethereum, xrp)"),
                network: z.string().describe("Network name (e.g. mainnet, testnet, sepolia)"),
                extendedPublicKey: z.string().describe("xPub/yPub/zPub extended public key"),
                count: z.string().optional().describe("Number of addresses to derive, defaults to 5"),
            },
        },
        (args): GetPromptResult => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Use derive_addresses to derive ${args.count ?? "5"} (default 5) receiving addresses from the extended public key ${args.extendedPublicKey} on ${args.blockchain}/${args.network}. This derives addresses without syncing a wallet — useful for generating deposit addresses or verifying derivation paths. Present the derived addresses in a numbered list.\n\n${formatSupportedChains(supportedChains)}`,
                    },
                },
            ],
        }),
    );
}
