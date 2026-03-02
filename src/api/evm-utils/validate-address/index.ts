import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { ValidateAddressRequest } from "./types.js";

export type ValidateAddressInput = ValidateAddressRequest & RequestMetadata;

export async function validateAddress(
    client: CryptoApisHttpClient,
    input: ValidateAddressInput
) {
    const path = `/utils/evm/${input.blockchain}/${input.network}/validate-address`;

    return client.request<unknown>("POST", path, {
        query: { context: input.context },
        body: { data: { item: { address: input.address } } },
    });
}
