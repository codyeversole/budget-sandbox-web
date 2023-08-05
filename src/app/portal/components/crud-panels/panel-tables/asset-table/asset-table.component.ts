import { Component, EventEmitter, Output } from '@angular/core';
import { AssetModel } from 'src/app/portal/models/asset-model';
import { currencyMaskOptions } from 'src/app/shared/mask-options/currency-mask-options';
import { PanelTableBaseComponent } from '../../panel-table-base.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAssets } from 'src/app/portal/store/selectors/assets.selector';

@Component({
  selector: 'app-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.scss']
})
export class AssetTableComponent extends PanelTableBaseComponent<AssetModel> {
  @Output() override edited = new EventEmitter<{item: AssetModel, id: number}>();
  public currencyMaskOptions = currencyMaskOptions;

  public assets$: Observable<AssetModel[]> = this.store.select(selectAssets);

  constructor(private store: Store) { super() }

  public emitEdit(asset: AssetModel): void {
    this.edited.next({ item: asset, id: asset.assetId ?? 0});
  }

}
