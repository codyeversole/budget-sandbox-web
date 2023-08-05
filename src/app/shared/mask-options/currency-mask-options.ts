import { AnyMaskedOptions } from 'imask';

export const currencyFormMaskOptions: AnyMaskedOptions = {
    lazy: false,
    mask: '$ num',
    blocks: {
        num: {
            mask: Number,
            thousandsSeparator: ',',
            min: 0,
            max: Number.MAX_SAFE_INTEGER,
            scale: 2,
            radix: '.',
            normalizeZeros: true,
            padFractionalZeros: true
        }
    }
}

export const currencyMaskOptions: AnyMaskedOptions = {
    lazy: false,
    mask: '$ num',
    blocks: {
        num: {
            mask: Number,
            thousandsSeparator: ',',
            scale: 2,
            radix: '.',
            min: Number.MAX_SAFE_INTEGER * -1,
            max: Number.MAX_SAFE_INTEGER,
            normalizeZeros: true,
            padFractionalZeros: true
        }
    }
}