import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { DecodeXAddressRequest } from "./types.js";

export type DecodeXAddressInput = DecodeXAddressRequest & RequestMetadata;

export async function decodeXAddress(
    client: CryptoApisHttpClient,
    input: DecodeXAddressInput
) {
    const path = `/utils/xrp/${input.network}/decode-x-address/${encodeURIComponent(input.xAddress)}`;

    return client.request<unknown>("GET", path, {
        query: { context: input.context },
    });
}
