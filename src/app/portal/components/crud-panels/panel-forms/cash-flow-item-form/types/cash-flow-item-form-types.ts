import { FormControl, FormGroup } from "@angular/forms";

export type RelatedBase = {
    amount: FormControl<number | undefined | null>;
    amountFormated: FormControl<string | null>,
    percent: FormControl<number | undefined | null>;
    percentFormated: FormControl<string | null>,
    usePercent: FormControl<boolean | null>;
};

export type RelatedAccount = FormGroup<RelatedBase & {
    cashFlowItemAccountId: FormControl<number | undefined | null>;
    accountId: FormControl<number | undefined | null>;
}>;

export type RelatedBucket = FormGroup<RelatedBase & {
    cashFlowItemBucketId: FormControl<number | undefined | null>;
    bucketId: FormControl<number | undefined | null>;
}>;