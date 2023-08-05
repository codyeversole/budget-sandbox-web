import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CashFlowItemModel } from 'src/app/portal/models/cash-flow-item-model';
import { PanelFormBaseComponent } from '../../panel-form-base.component';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CashFlowFrequency } from 'src/app/portal/models/cash-flow-frequency-enum';
import { AccountModel } from 'src/app/portal/models/account-model';
import { BucketModel } from 'src/app/portal/models/bucket-model';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { CashFlowItemValidators } from './validators/cash-flow-item-validators.directive';
import { AssetModel } from 'src/app/portal/models/asset-model';
import { currencyFormMaskOptions } from 'src/app/shared/mask-options/currency-mask-options';
import { percentMaskOptions } from 'src/app/shared/mask-options/percent-mask-options';
import { RelatedAccount, RelatedBucket } from './types/cash-flow-item-form-types';
import { MathService } from 'src/app/shared/services/math.service';
import { SandboxService } from 'src/app/portal/services/sandbox.service';
import { selectBuckets } from 'src/app/portal/store/selectors/buckets.selector';
import { selectAssets } from 'src/app/portal/store/selectors/assets.selector';
import { selectAccounts } from 'src/app/portal/store/selectors/accounts.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cash-flow-item-form',
  templateUrl: './cash-flow-item-form.component.html',
  styleUrls: ['./cash-flow-item-form.component.scss']
})
export class CashFlowItemFormComponent extends PanelFormBaseComponent<CashFlowItemModel> implements OnInit, OnDestroy {
  @Input() override item: CashFlowItemModel | undefined;
  @Output() override formChanged = new EventEmitter<FormGroup>();
  @Output() override saved = new EventEmitter<void>();
  public CashFlowFrequency = CashFlowFrequency;
  public positive = false;
  public allocatedRemainderAmount: string | undefined;
  public allocatedRemainderPercent: string | undefined;
  public currencyFormMaskOptions = currencyFormMaskOptions;
  public percentMaskOptions = percentMaskOptions;
  public accounts$: Observable<AccountModel[]> = this.store.select(selectAccounts);
  public buckets$: Observable<BucketModel[]> = this.store.select(selectBuckets);
  public assets$: Observable<AssetModel[]> = this.store.select(selectAssets);

  public form = new FormGroup({
    sandboxId: new FormControl<number>(0, Validators.required),
    cashFlowItemId: new FormControl<number>(0, Validators.required),
    description: new FormControl<string | undefined>(undefined, Validators.required),
    amount: new FormControl<number | undefined>(undefined, Validators.required),
    amountFormated: new FormControl<string>(''),
    frequency: new FormControl<string | undefined>(undefined, Validators.required),
    positive: new FormControl<boolean>(false, Validators.required),
    assetId: new FormControl<number | undefined>(undefined),
    cashFlowItemAccounts: new FormArray<RelatedAccount>([]),
    cashFlowItemBuckets: new FormArray<RelatedBucket>([]),
  }, { 
    validators: [this.validators.assetNotAllowedValidator, this.validators.accountsAndBucketsValidator]
  });

  public accountsFormArray = this.form.controls.cashFlowItemAccounts;
  public bucketsFormArray = this.form.controls.cashFlowItemBuckets;

  private destroy$ = new ReplaySubject<boolean>();

  constructor(
    private sandboxService: SandboxService,
    private mathService: MathService,
    private validators: CashFlowItemValidators,
    private store: Store,
  ) { super() }

  ngOnInit(): void {
    this.initForm();
    this.emitForm();

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.emitForm();
    })
  }

  public emitSave(): void {
    this.saved.next();
  }

  public togglePositive() {
    this.positive = !this.positive;
    this.form.controls.positive.setValue(this.positive);

    if(this.positive == false) {
      this.form.controls.assetId.setValue(undefined);
    }
  }
  
  public addNewAccountOrBucket(accountOrBucket: 'account' | 'bucket'): void {
    this.addAccountOrBucket(accountOrBucket, undefined, undefined, undefined, undefined, true);
  }

  public removeAccountOrBucket(accountOrBucket: 'account' | 'bucket', index: number): void {
    const formArray = accountOrBucket == 'account' ? this.accountsFormArray : this.bucketsFormArray;
    formArray.removeAt(index);
  }

  public toggleAccountOrBucketUsePercent(accountOrBucket: 'account' | 'bucket', index: number): void {
    const formArray = accountOrBucket == 'account' ? this.accountsFormArray : this.bucketsFormArray;

    const formGroup = formArray.controls.at(index);    

    if(formGroup) {
      const usePercent = formGroup.controls.usePercent.value;
      if(usePercent) {
        formGroup.controls.percent.setValue(undefined);
        formGroup.controls.percentFormated.setValue('');
        formGroup.controls.usePercent.setValue(false);
      } else {
        formGroup.controls.amount.setValue(undefined);
        formGroup.controls.amountFormated.setValue('');
        formGroup.controls.usePercent.setValue(true);
      }
    }
  }

  private addAccountOrBucket(accountOrBucket: 'account' | 'bucket', cashFlowItemRelatedId: number | undefined, relatedId: number | undefined, amount: number | undefined, amountPercent: number | undefined, usePercent: boolean): void {
    const amountFormatted = amount?.toString() ?? '';
    const percent = amountPercent == 0 ? undefined : amountPercent;
    const percentFomatted = (amountPercent == 0 ? '' : amountPercent)?.toString() ?? '';

    if(accountOrBucket == 'account') {
      this.accountsFormArray.push(      
        new FormGroup({
          cashFlowItemAccountId: new FormControl<number | undefined>(cashFlowItemRelatedId),
          accountId: new FormControl<number | undefined>(relatedId, Validators.required),
          amount: new FormControl<number | undefined>(amount),
          amountFormated: new FormControl<string>(amountFormatted),
          percent: new FormControl<number | undefined>(percent),
          percentFormated: new FormControl<string>(percentFomatted),
          usePercent: new FormControl<boolean>(usePercent)
        })
      );
    } else {
      this.bucketsFormArray.push(      
        new FormGroup({
          cashFlowItemBucketId: new FormControl<number | undefined>(cashFlowItemRelatedId),
          bucketId: new FormControl<number | undefined>(relatedId, Validators.required),
          amount: new FormControl<number | undefined>(amount),
          amountFormated: new FormControl<string>(amountFormatted),
          percent: new FormControl<number | undefined>(percent),
          percentFormated: new FormControl<string>(percentFomatted),
          usePercent: new FormControl<boolean>(usePercent)
        })
      );
    }
  }

  private initForm(): void {
    this.form.controls.sandboxId.setValue(this.sandboxService.currentSandbox?.sandboxId ?? 0);

    if(this.item) {
      this.form.controls.cashFlowItemId.setValue(this.item.cashFlowItemId ?? 0);
      this.form.controls.description.setValue(this.item.description);
      this.form.controls.amount.setValue(this.item.amount);
      this.form.controls.amountFormated.setValue(this.item.amount.toString());
      this.form.controls.frequency.setValue(this.item.frequency);
      this.form.controls.positive.setValue(this.item.positive);
      this.form.controls.assetId.setValue(this.item.assetId);

      this.item.cashFlowItemAccounts.forEach(account => {
        this.addAccountOrBucket('account', account.cashFlowItemAccountId, account.accountId, account.amount, account.percent ? account.percent * 100 : undefined, !account.amount);
      });

      this.item.cashFlowItemBuckets.forEach(bucket => {
        this.addAccountOrBucket('bucket', bucket.cashFlowItemBucketId, bucket.bucketId, bucket.amount, bucket.percent ? bucket.percent * 100 : undefined, !bucket.amount);
      });

      this.positive = this.item.positive;
    }
  }

  private emitForm(): void {
    this.form.controls.amount.setValue(this.mathService.preciseNumber(this.form.controls.amountFormated.value), { emitEvent: false });
    this.accountsFormArray.controls.forEach(control => this.updateAmountAndPercent(control));
    this.bucketsFormArray.controls.forEach(control => this.updateAmountAndPercent(control));

    this.calculateAllocatedRemainder();

    this.formChanged.next(this.form);
  }

  private updateAmountAndPercent(formGroup: RelatedAccount | RelatedBucket) {
    formGroup.controls.amount.setValue(this.mathService.preciseNumber(formGroup.controls.amountFormated.value), { emitEvent: false });

    const percent = this.mathService.preciseNumber(formGroup.controls.percentFormated.value);
    formGroup.controls.percent.setValue(percent ? percent / 100 : undefined, { emitEvent: false });
  }

  private calculateAllocatedRemainder() {
    const cashFlowItemAmount = this.form.controls.amount.value;
    if(cashFlowItemAmount) {
      let total = 0;

      this.accountsFormArray.controls.forEach(control => {
        total += this.mathService.totalFromAmountOrPercent(
          cashFlowItemAmount, 
          control.controls.usePercent.value,
          control.controls.amount.value,
          control.controls.percent.value
        );    
      });

      this.bucketsFormArray.controls.forEach(control => {
        total += this.mathService.totalFromAmountOrPercent(
          cashFlowItemAmount, 
          control.controls.usePercent.value,
          control.controls.amount.value,
          control.controls.percent.value
        );     
      });

      const allocatedRemainderAmount = cashFlowItemAmount - total;
      this.allocatedRemainderAmount = allocatedRemainderAmount.toString();
      this.allocatedRemainderPercent = ((allocatedRemainderAmount / cashFlowItemAmount) * 100).toString();
    } else {
      this.allocatedRemainderAmount = undefined;
      this.allocatedRemainderPercent = undefined;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
