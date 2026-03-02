import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import {
    encodeXAddress,
    type EncodeXAddressInput,
} from "../../../api/xrp-utils/encode-x-address/index.js";

export async function handleEncodeXAddress(
    client: CryptoApisHttpClient,
    input: EncodeXAddressInput
) {
    return encodeXAddress(client, input);
}
