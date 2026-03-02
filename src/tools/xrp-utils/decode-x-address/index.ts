import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import {
    decodeXAddress,
    type DecodeXAddressInput,
} from "../../../api/xrp-utils/decode-x-address/index.js";

export async function handleDecodeXAddress(
    client: CryptoApisHttpClient,
    input: DecodeXAddressInput
) {
    return decodeXAddress(client, input);
}
