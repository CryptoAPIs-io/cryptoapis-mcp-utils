import { systemInfoTool } from "@cryptoapis-io/mcp-shared";
import { utxoUtilsTool } from "./utxo-utils/index.js";
import { evmUtilsTool } from "./evm-utils/index.js";
import { xrpUtilsTool } from "./xrp-utils/index.js";
import { deriveAddressesTool } from "./derive-addresses/index.js";

export const tools = [utxoUtilsTool, evmUtilsTool, xrpUtilsTool, deriveAddressesTool, systemInfoTool] as const;
