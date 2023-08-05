import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable, ReplaySubject, combineLatest, map, startWith, takeUntil } from 'rxjs';
import { AccountModel } from 'src/app/portal/models/account-model';
import { BucketModel } from 'src/app/portal/models/bucket-model';
import { MathService } from 'src/app/shared/services/math.service';
import { currencyFormMaskOptions } from 'src/app/shared/mask-options/currency-mask-options';
import { percentMaskOptions } from 'src/app/shared/mask-options/percent-mask-options';
import { PanelFormBaseComponent } from '../../panel-form-base.component';
import { RelatedAccountBucket } from './types/bucket-form-types';
import { BucketValidators } from './validators/bucket-validators.directive';
import { SandboxService } from 'src/app/portal/services/sandbox.service';
import { selectAccounts } from 'src/app/portal/store/selectors/accounts.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-bucket-form',
  templateUrl: './bucket-form.component.html',
  styleUrls: ['./bucket-form.component.scss']
})
export class BucketFormComponent extends PanelFormBaseComponent<BucketModel> implements OnInit, OnDestroy {
  @Input() override item: BucketModel | undefined;
  @Output() override formChanged = new EventEmitter<FormGroup>();
  @Output() override saved = new EventEmitter<void>();
  public allocatedRemainderAmount: string | undefined;
  public allocatedRemainderPercent: string | undefined;
  public currencyFormMaskOptions = currencyFormMaskOptions;
  public percentMaskOptions = percentMaskOptions;
  public positive = true;
  public accounts$: Observable<AccountModel[]> = this.store.select(selectAccounts);
  public filteredAccounts$: Observable<AccountModel[]> | undefined = undefined;

  public form = new FormGroup({
    sandboxId: new FormControl<number>(0, Validators.required),
    bucketId: new FormControl<number>(0, Validators.required),
    description: new FormControl<string | undefined>(undefined, Validators.required),
    balance: new FormControl<number | undefined>(undefined, Validators.required),
    balanceFormatted: new FormControl<string>(''),
    goalBalance: new FormControl<number | undefined>(undefined),
    goalBalanceFormatted: new FormControl<string>(''),
    positive: new FormControl<boolean>(true),
    archived: new FormControl<boolean>(false),
    goalAchieved: new FormControl<boolean>(false, Validators.required),
    accountBuckets: new FormArray<RelatedAccountBucket>([]),
  }, { 
    validators: [this.validators.accountBucketsValidator]
  });

  public accountsFormArray = this.form.controls.accountBuckets;

  private destroy$ = new ReplaySubject<boolean>();

  constructor(
    private sandboxService: SandboxService,
    private mathService: MathService,
    private validators: BucketValidators,
    private store: Store,
  ) { super() }

  ngOnInit(): void {
    this.initForm();
    this.emitForm();

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.emitForm();
    });

    this.filteredAccounts$ = combineLatest([
      this.accounts$,
      this.form.controls.positive.valueChanges.pipe(startWith(this.positive))
    ]).pipe(
      takeUntil(this.destroy$),
      map(results => {
        const accounts = results[0];

        const filteredAccounts = accounts.filter(a => a.positive == this.positive) ?? [];
        this.filterAccounts(filteredAccounts);
        return filteredAccounts;
      })
    )
  }

  public emitSave(): void {
    this.saved.next();
  }

  public togglePositive() {
    this.positive = !this.positive;
    this.form.controls.positive.setValue(this.positive);
  }
  
  public addNewAccount(): void {
    this.addAccount(undefined, undefined, undefined, undefined, true);
  }

  public removeAccount(index: number): void {
    this.accountsFormArray.removeAt(index);
  }

  public toggleAccountUsePercent(index: number): void {
    const formGroup = this.accountsFormArray.controls.at(index);    

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

  private addAccount(accountBucketId: number | undefined, accountId: number | undefined, amount: number | undefined, amountPercent: number | undefined, usePercent: boolean): void {
    const amountFormatted = amount?.toString() ?? '';
    const percent = amountPercent == 0 ? undefined : amountPercent;
    const percentFomatted = (amountPercent == 0 ? '' : amountPercent)?.toString() ?? '';

    this.accountsFormArray.push(      
      new FormGroup({
        accountBucketId: new FormControl<number | undefined>(accountBucketId),
        accountId: new FormControl<number | undefined>(accountId, Validators.required),
        amount: new FormControl<number | undefined>(amount),
        amountFormated: new FormControl<string>(amountFormatted),
        percent: new FormControl<number | undefined>(percent),
        percentFormated: new FormControl<string>(percentFomatted),
        usePercent: new FormControl<boolean>(usePercent)
      })
    );
  }

  private initForm(): void {
    this.form.controls.sandboxId.setValue(this.sandboxService.currentSandbox?.sandboxId ?? 0);

    if(this.item) {
      this.form.controls.bucketId.setValue(this.item.bucketId ?? 0);
      this.form.controls.description.setValue(this.item.description);
      this.form.controls.balance.setValue(this.item.balance);
      this.form.controls.balanceFormatted.setValue(this.item.balance.toString());
      this.form.controls.goalBalance.setValue(this.item.goalBalance);
      this.form.controls.goalBalanceFormatted.setValue(this.item.goalBalance?.toString() ?? '');
      this.form.controls.goalAchieved.setValue(this.item.goalAchieved);
      this.form.controls.positive.setValue(this.item.positive);
      this.form.controls.archived.setValue(this.item.archived);

      this.item.accountBuckets.forEach(account => {
        this.addAccount(account.accountBucketId, account.accountId, account.amount, account.percent ? account.percent * 100 : undefined, !account.amount);
      });

      this.positive = this.item.positive;
    }
  }

  private filterAccounts(filteredAccounts: AccountModel[]): void {
    let index = 0;
    while(index < this.accountsFormArray.length) {
      const accountId = this.accountsFormArray.at(index).controls.accountId.value;
      if(!accountId || filteredAccounts.some(fa => fa.accountId == accountId)){
        index++;
      } else {
        this.accountsFormArray.removeAt(index);
      }
    }
  }

  private emitForm(): void {
    this.form.controls.balance.setValue(this.mathService.preciseNumber(this.form.controls.balanceFormatted.value), { emitEvent: false });
    this.form.controls.goalBalance.setValue(this.mathService.preciseNumber(this.form.controls.goalBalanceFormatted.value), { emitEvent: false });
    this.accountsFormArray.controls.forEach(control => this.updateAmountAndPercent(control));

    this.calculateAllocatedRemainder();

    this.formChanged.next(this.form);
  }

  private updateAmountAndPercent(formGroup: RelatedAccountBucket) {
    formGroup.controls.amount.setValue(this.mathService.preciseNumber(formGroup.controls.amountFormated.value), { emitEvent: false });

    const percent = this.mathService.preciseNumber(formGroup.controls.percentFormated.value);
    formGroup.controls.percent.setValue(percent ? percent / 100 : undefined, { emitEvent: false });
  }

  private calculateAllocatedRemainder() {
    const bucketAmount = this.form.controls.balance.value;
    if(bucketAmount) {
      let total = 0;

      this.accountsFormArray.controls.forEach(control => {
        total += this.mathService.totalFromAmountOrPercent(
          bucketAmount, 
          control.controls.usePercent.value,
          control.controls.amount.value,
          control.controls.percent.value
        );    
      });

      const allocatedRemainderAmount = bucketAmount - total;
      this.allocatedRemainderAmount = allocatedRemainderAmount.toString();
      this.allocatedRemainderPercent = ((allocatedRemainderAmount / bucketAmount) * 100).toString();
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
