import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import {
    decodeRawTransaction,
    type DecodeRawTransactionInput,
} from "../../../api/evm-utils/decode-raw-transaction/index.js";

export async function handleDecodeRawTransaction(
    client: CryptoApisHttpClient,
    input: DecodeRawTransactionInput
) {
    return decodeRawTransaction(client, input);
}
