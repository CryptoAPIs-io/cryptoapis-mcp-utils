import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { EncodeXAddressRequest } from "./types.js";

export type EncodeXAddressInput = EncodeXAddressRequest & RequestMetadata;

export async function encodeXAddress(
    client: CryptoApisHttpClient,
    input: EncodeXAddressInput
) {
    const path = `/utils/xrp/${input.network}/encode-x-address/${encodeURIComponent(input.classicAddress)}/${input.addressTag}`;

    return client.request<unknown>("GET", path, {
        query: { context: input.context },
    });
}
