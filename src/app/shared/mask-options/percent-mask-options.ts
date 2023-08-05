import { AnyMaskedOptions } from 'imask';

export const percentMaskOptions: AnyMaskedOptions = {
    lazy: false,
    mask: 'num %',
    blocks: {
        num: {
            mask: Number,
            min: 0,
            max: 100,
            scale: 3,
            radix: '.',
            normalizeZeros: true,
            padFractionalZeros: true
        }
    }
}

export const percentShortMaskOptions: AnyMaskedOptions = {
    lazy: false,
    mask: 'num%',
    blocks: {
        num: {
            mask: Number,
            min: 0,
            max: 100,
            scale: 0,
            radix: '.',
            normalizeZeros: true,
            padFractionalZeros: true
        }
    }
}