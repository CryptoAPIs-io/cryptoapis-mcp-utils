export type DeriveAddressesRequest = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
    addressFormat?: string;
    addressesCount?: number;
    isChange?: boolean;
    startIndex?: number;
};
