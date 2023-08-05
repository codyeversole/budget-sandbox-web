import { FormControl, FormGroup } from "@angular/forms";
import { RelatedBase } from "../../cash-flow-item-form/types/cash-flow-item-form-types";

export type RelatedAccountBucket = FormGroup<RelatedBase & {
    accountBucketId: FormControl<number | undefined | null>;
    accountId: FormControl<number | undefined | null>;
}>;