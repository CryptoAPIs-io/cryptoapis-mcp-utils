import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { ConvertBitcoinCashAddressRequest } from "./types.js";

export type ConvertBitcoinCashAddressInput = ConvertBitcoinCashAddressRequest & RequestMetadata;

export async function convertBitcoinCashAddress(
    client: CryptoApisHttpClient,
    input: ConvertBitcoinCashAddressInput
) {
    const path = `/utils/bitcoin-cash/${input.network}/convert-address`;

    return client.request<unknown>("POST", path, {
        query: { context: input.context },
        body: { data: { item: { address: input.address } } },
    });
}
