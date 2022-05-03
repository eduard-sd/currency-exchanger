
export interface ICurrencyExchangeRequest {
    source_currency: string;
    target_currency: string;
    source_amount?: string;
    target_amount?: string;
}

export interface ICurrencyExchangeResponse {
    id: string
    source_currency: ECurrency
    target_currency: ECurrency
    source_amount: string
    target_amount: string
    fiat_blockchain_fee: string
    absolute_internal_fee: string
    internal_fee_percent: string
    expires_at: string

}

type TShortResponse = Pick<ICurrencyExchangeResponse,'source_amount'| 'target_amount' | 'fiat_blockchain_fee' | 'absolute_internal_fee'>;

export enum ECurrency{
    USD = "USD",
    USDC_EVMOS = "USDC_EVMOS",
}

export enum EInput {
    FIAT_INPUT = "FIAT_INPUT",
    CRYPTO_INPUT = "CRYPTO_INPUT",
}

