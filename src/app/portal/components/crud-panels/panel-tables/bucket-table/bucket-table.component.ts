import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BucketModel } from 'src/app/portal/models/bucket-model';
import { currencyMaskOptions } from 'src/app/shared/mask-options/currency-mask-options';
import { PanelTableBaseComponent } from '../../panel-table-base.component';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { AccountModel } from 'src/app/portal/models/account-model';
import { selectAccounts } from 'src/app/portal/store/selectors/accounts.selector';
import { selectBuckets } from 'src/app/portal/store/selectors/buckets.selector';

@Component({
  selector: 'app-bucket-table',
  templateUrl: './bucket-table.component.html',
  styleUrls: ['./bucket-table.component.scss']
})
export class BucketTableComponent extends PanelTableBaseComponent<BucketModel> implements OnInit {
  @Output() override edited = new EventEmitter<{item: BucketModel, id: number}>();
  private buckets$: Observable<BucketModel[]> = this.store.select(selectBuckets);
  private accounts$: Observable<AccountModel[]> = this.store.select(selectAccounts);
  public currencyMaskOptions = currencyMaskOptions;
  public bucketResults$: Observable<BucketModel[]> | undefined;

  constructor(private store: Store) { super() }

  ngOnInit() {
    this.bucketResults$ = combineLatest([
      this.buckets$,
      this.accounts$,
    ]).pipe(map(results => {
      const buckets: BucketModel[] = JSON.parse(JSON.stringify(results[0]));
      const accounts = results[1];

      buckets.forEach(bucket => {
        bucket.accountBuckets.forEach(account => {
          account.account = accounts.find(a => a.accountId == account.accountId);
        });
      });

      return buckets;
    }));
  }

  public emitEdit(bucket: BucketModel): void {
    this.edited.next({ item: bucket, id: bucket.bucketId ?? 0});
  }

}
