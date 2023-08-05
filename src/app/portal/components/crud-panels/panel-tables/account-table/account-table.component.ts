import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountModel } from 'src/app/portal/models/account-model';
import { PanelTableBaseComponent } from '../../panel-table-base.component';
import { currencyMaskOptions } from 'src/app/shared/mask-options/currency-mask-options';
import { MathService } from 'src/app/shared/services/math.service';
import { Store } from '@ngrx/store';
import { selectAccounts } from 'src/app/portal/store/selectors/accounts.selector';
import { selectBuckets } from 'src/app/portal/store/selectors/buckets.selector';
import { Observable, combineLatest, map } from 'rxjs';
import { BucketModel } from 'src/app/portal/models/bucket-model';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss']
})
export class AccountTableComponent extends PanelTableBaseComponent<AccountModel> implements OnInit {
  @Output() override edited = new EventEmitter<{item: AccountModel, id: number}>();
  public currencyMaskOptions = currencyMaskOptions;
  public accountResults$: Observable<(AccountModel & { accountBalanceAfterBuckets: number, totalBucketBalance: number })[]> | undefined;
  public accounts$: Observable<AccountModel[]> = this.store.select(selectAccounts);
  public buckets$: Observable<BucketModel[]> = this.store.select(selectBuckets);

  constructor(
    private mathService: MathService,
    private store: Store
  ) { super() }

  ngOnInit(): void {
    this.accountResults$ = combineLatest([
      this.accounts$, this.buckets$
    ]).pipe(map(results => {
      const accountResults: (AccountModel & { accountBalanceAfterBuckets: number, totalBucketBalance: number })[] = [];
      const accounts = results[0];
      const buckets = results[1];

      accounts.forEach(account => {
        let bucketBalance = 0;

        buckets.forEach(bucket => {
          bucket.accountBuckets.forEach(accountBucket => {
            if(accountBucket.accountId == account.accountId){
              bucketBalance += this.mathService.totalFromAmountOrPercent(
                bucket.balance,
                accountBucket.amount ? false : true,
                accountBucket.amount,
                accountBucket.percent
              );
            }
          });
        });

        accountResults.push({...account, accountBalanceAfterBuckets: account.balance - bucketBalance, totalBucketBalance: bucketBalance});
      });

      return accountResults;
    }));
  }

  public emitEdit(account: AccountModel): void {
    this.edited.next({ item: account, id: account.accountId ?? 0});
  }

}
