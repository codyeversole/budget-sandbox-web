import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";
import { RelatedAccount, RelatedBucket } from "../types/cash-flow-item-form-types";
import { MathService } from "src/app/shared/services/math.service";

@Injectable({
  providedIn: 'root',
})
export class CashFlowItemValidators {

  constructor(private mathService: MathService) {}

  public assetNotAllowedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const assetId = control.get('assetId')?.value;
    const positive = control.get('positive')?.value;
  
    return assetId && positive == false ? { assetNotAllowed: true } : null;
  };

  public accountsAndBucketsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const amount = control.get('amount')?.value;
    const accounts = control.get('cashFlowItemAccounts') as FormArray<RelatedAccount>;
    const buckets = control.get('cashFlowItemBuckets') as FormArray<RelatedBucket>;

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

      buckets.controls.forEach(control => {
        total += this.mathService.totalFromAmountOrPercent(
          amount, 
          control.controls.usePercent.value,
          control.controls.amount.value,
          control.controls.percent.value
        );      
      });

      return amount == total ? null : { accountsAndBuckets: true };
    } else {
      return null;
    }
  };
}
