import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { DecodeRawTransactionRequest } from "./types.js";

export type DecodeRawTransactionInput = DecodeRawTransactionRequest & RequestMetadata;

export async function decodeRawTransaction(
    client: CryptoApisHttpClient,
    input: DecodeRawTransactionInput
) {
    const path = `/utils/utxo/${input.blockchain}/${input.network}/decode-raw-transaction`;

    return client.request<unknown>("POST", path, {
        query: { context: input.context },
        body: { data: { item: { rawTransactionHex: input.rawTransactionHex } } },
    });
}
