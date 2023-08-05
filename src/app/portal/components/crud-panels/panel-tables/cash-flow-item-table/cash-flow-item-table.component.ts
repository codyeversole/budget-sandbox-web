import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CashFlowItemModel } from 'src/app/portal/models/cash-flow-item-model';
import { PanelTableBaseComponent } from '../../panel-table-base.component';
import { currencyFormMaskOptions } from 'src/app/shared/mask-options/currency-mask-options';
import { Observable, combineLatest, map } from 'rxjs';
import { selectCashFlowItems } from 'src/app/portal/store/selectors/cash-flow-items.selector';
import { Store } from '@ngrx/store';
import { AccountModel } from 'src/app/portal/models/account-model';
import { selectAccounts } from 'src/app/portal/store/selectors/accounts.selector';
import { selectBuckets } from 'src/app/portal/store/selectors/buckets.selector';
import { selectAssets } from 'src/app/portal/store/selectors/assets.selector';
import { BucketModel } from 'src/app/portal/models/bucket-model';
import { AssetModel } from 'src/app/portal/models/asset-model';

@Component({
  selector: 'app-cash-flow-item-table',
  templateUrl: './cash-flow-item-table.component.html',
  styleUrls: ['./cash-flow-item-table.component.scss']
})
export class CashFlowItemTableComponent  extends PanelTableBaseComponent<CashFlowItemModel> implements OnInit {
  @Output() override edited = new EventEmitter<{item: CashFlowItemModel, id: number}>();
  private cashFlowItems$: Observable<CashFlowItemModel[]> = this.store.select(selectCashFlowItems);
  private accounts$: Observable<AccountModel[]> = this.store.select(selectAccounts);
  private buckets$: Observable<BucketModel[]> = this.store.select(selectBuckets);
  private assets$: Observable<AssetModel[]> = this.store.select(selectAssets);
  public currencyFormMaskOptions = currencyFormMaskOptions;
  public cashFlowItemResults$: Observable<CashFlowItemModel[]> | undefined;

  constructor(
    private store: Store
  ) { super() }

  ngOnInit() {
    this.cashFlowItemResults$ = combineLatest([
      this.cashFlowItems$,
      this.accounts$,
      this.buckets$,
      this.assets$
    ]).pipe(map(results => {
      const cashFlowItems: CashFlowItemModel[] = JSON.parse(JSON.stringify(results[0]));
      const accounts = results[1];
      const buckets = results[2];
      const assets = results[3];

      cashFlowItems.forEach(item => {
        item.cashFlowItemAccounts.forEach(account => {
          account.account = accounts.find(a => a.accountId == account.accountId);
        });

        item.cashFlowItemBuckets.forEach(bucket => {
          bucket.bucket = buckets.find(b => b.bucketId == bucket.bucketId);
        });

        item.asset = assets.find(a => a.assetId == item.assetId);
      });

      return cashFlowItems;
    }));
  }

  public emitEdit(account: CashFlowItemModel): void {
    this.edited.next({ item: account, id: account.cashFlowItemId ?? 0});
  }

}
