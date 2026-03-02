import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { DeriveAddressesRequest } from "./types.js";

export type DeriveAddressesInput = DeriveAddressesRequest & RequestMetadata;

/**
 * Derive HD wallet (xPub/yPub/zPub) change or receiving addresses.
 * GET /utils/{blockchain}/{network}/xpubs/{extendedPublicKey}/derive-addresses
 */
export async function deriveAddresses(
    client: CryptoApisHttpClient,
    input: DeriveAddressesInput
) {
    const path = `/utils/${encodeURIComponent(input.blockchain)}/${encodeURIComponent(input.network)}/xpubs/${encodeURIComponent(input.extendedPublicKey)}/derive-addresses`;

    const query: Record<string, string | number | boolean | undefined> = {
        context: input.context,
        addressFormat: input.addressFormat,
        addressesCount: input.addressesCount,
        isChange: input.isChange,
        startIndex: input.startIndex,
    };

    const cleanQuery: Record<string, string> = {};
    for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== null && v !== "") {
            cleanQuery[k] = String(v);
        }
    }

    return client.request<unknown>("GET", path, { query: cleanQuery });
}
