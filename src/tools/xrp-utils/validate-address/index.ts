import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { validateAddress, type ValidateAddressInput } from "../../../api/xrp-utils/validate-address/index.js";

export async function handleValidateAddress(
    client: CryptoApisHttpClient,
    input: ValidateAddressInput
) {
    return validateAddress(client, input);
}
