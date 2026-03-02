import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { convertBitcoinCashAddress, type ConvertBitcoinCashAddressInput } from "../../../api/utxo-utils/convert-bitcoin-cash-address/index.js";

export async function handleConvertBitcoinCashAddress(
    client: CryptoApisHttpClient,
    input: ConvertBitcoinCashAddressInput
) {
    return convertBitcoinCashAddress(client, input);
}
