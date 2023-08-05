import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";
import { RelatedAccountBucket } from "../types/bucket-form-types";
import { MathService } from "src/app/shared/services/math.service";

@Injectable({
  providedIn: 'root',
})
export class BucketValidators {

  constructor(private mathService: MathService) {}

  public accountBucketsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const amount = control.get('balance')?.value;
    const accounts = control.get('accountBuckets') as FormArray<RelatedAccountBucket>;

    if(amount) {
      let total = 0;

      accounts.controls.forEach(control => {
        total += this.mathService.totalFromAmountOrPercent(
          amount, 
          control.controls.usePercent.value,
          control.controls.amount.value,
          control.controls.percent.value
        );       
      });

      return amount == total ? null : { accountBuckets: true };
    } else {
      return null;
    }
  };
}
