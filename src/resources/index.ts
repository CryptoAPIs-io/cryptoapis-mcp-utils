import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { buildSupportedChainsContent } from "@cryptoapis-io/mcp-shared";
import { supportedChains } from "./supported-chains.js";

const RESOURCE_URI = "cryptoapis://utils/supported-chains";

export function registerResources(server: McpServer): void {
    server.registerResource(
        "supported-chains",
        RESOURCE_URI,
        { description: "Lists every blockchain, network, and action supported by the utils tools" },
        (uri) => ({
            contents: [{
                uri: uri.href,
                mimeType: "application/json",
                text: buildSupportedChainsContent(supportedChains),
            }],
        }),
    );
}
