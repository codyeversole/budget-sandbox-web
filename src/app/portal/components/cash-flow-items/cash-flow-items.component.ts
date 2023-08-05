import { Component } from '@angular/core';
import { PanelConfigurationService } from '../../services/panel-configuration.service';
import { loadCashFlowItems } from '../../store/actions/cash-flow-items.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cash-flow-items',
  templateUrl: './cash-flow-items.component.html',
  styleUrls: ['./cash-flow-items.component.scss']
})
export class CashFlowItemsComponent {

  constructor(
    public panelConfigurationService: PanelConfigurationService,
    private store: Store
  ) { }

  public cashFlowItemsChanged(): void {
    this.store.dispatch(loadCashFlowItems());
  }
}
