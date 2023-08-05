import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountModel } from 'src/app/portal/models/account-model';
import { PanelFormBaseComponent } from '../../panel-form-base.component';
import { MathService } from 'src/app/shared/services/math.service';
import { currencyFormMaskOptions, currencyMaskOptions } from 'src/app/shared/mask-options/currency-mask-options';
import { SandboxService } from 'src/app/portal/services/sandbox.service';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { BucketModel } from 'src/app/portal/models/bucket-model';
import { selectBuckets } from 'src/app/portal/store/selectors/buckets.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent extends PanelFormBaseComponent<AccountModel> implements OnInit, OnDestroy {
  @Input() override item: AccountModel | undefined;
  @Output() override formChanged = new EventEmitter<FormGroup>();
  @Output() override saved = new EventEmitter<void>();
  public currencyFormMaskOptions = currencyFormMaskOptions;
  public currencyMaskOptions = currencyMaskOptions;
  public positive = true;
  public buckets: { bucket: string, balance: number }[] = [];
  public totalBucketBalance = 0;
  public totalAccountBalance = 0;
  public accountBalanceAfterBuckets = 0;
  public buckets$: Observable<BucketModel[]> = this.store.select(selectBuckets);
  private destroy$ = new ReplaySubject<boolean>();

  public form = new FormGroup({
    sandboxId: new FormControl<number>(0, Validators.required),
    accountId: new FormControl<number>(0, Validators.required),
    description: new FormControl<string | undefined>(undefined, Validators.required),
    balance: new FormControl<number | undefined>(undefined, Validators.required),
    balanceFormatted: new FormControl<string>(''),
    positive: new FormControl<boolean>(true)
  });
  
  constructor(
    private sandboxService: SandboxService, 
    private mathService: MathService,
    private store: Store
  ) { super() }

  ngOnInit(): void {
    this.form.controls.sandboxId.setValue(this.sandboxService.currentSandbox?.sandboxId ?? 0);

    if(this.item) {
      this.form.controls.accountId.setValue(this.item.accountId ?? 0);
      this.form.controls.description.setValue(this.item.description);
      this.form.controls.balance.setValue(this.item.balance);
      this.form.controls.balanceFormatted.setValue(this.item.balance.toString());
      this.form.controls.positive.setValue(this.item.positive);

      this.positive = this.item.positive;
    } else {
      this.form.controls.accountId.setValue(0);
      this.form.controls.description.setValue(undefined);
      this.form.controls.balance.setValue(undefined);
      this.form.controls.positive.setValue(true);
    }

    this.form.controls.balance.setValue(this.mathService.preciseNumber(this.form.controls.balanceFormatted.value), { emitEvent: false });
    this.formChanged.next(this.form);

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.form.controls.balance.setValue(this.mathService.preciseNumber(this.form.controls.balanceFormatted.value), { emitEvent: false });
      this.setTotals();
      this.formChanged.next(this.form);
    });

    if(this.item?.accountId){
      this.totalAccountBalance = this.item.balance

      this.buckets$.pipe(takeUntil(this.destroy$)).subscribe(buckets => {
        buckets.forEach(bucket => {
          bucket.accountBuckets.forEach(account => {
            if(account.accountId == this.item?.accountId){
              const balance = this.mathService.totalFromAmountOrPercent(
                bucket.balance,
                account.amount ? false : true,
                account.amount,
                account.percent
              );
  
              this.buckets.push({bucket: bucket.description, balance: balance});
            }
          });
        });
        
        this.totalBucketBalance = this.buckets.map(b => b.balance).reduce((a,b) => a + b, 0);
        this.accountBalanceAfterBuckets = this.totalAccountBalance - this.totalBucketBalance;
      });
    }
    
  }

  public emitSave(): void {
    this.saved.next();
  }

  public togglePositive() {
    this.positive = !this.positive;
    this.form.controls.positive.setValue(this.positive);
  }

  private setTotals(): void {
    this.totalAccountBalance = this.form.controls.balance.value ?? 0;
    this.accountBalanceAfterBuckets = this.totalAccountBalance - this.totalBucketBalance;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}

