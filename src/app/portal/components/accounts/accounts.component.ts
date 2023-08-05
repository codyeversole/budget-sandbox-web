import { Component } from '@angular/core';
import { PanelConfigurationService } from '../../services/panel-configuration.service';
import { loadAccounts } from '../../store/actions/accounts.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {

  constructor(
    public panelConfigurationService: PanelConfigurationService,
    private store: Store
  ) { }

  public accountChanged(): void {
    this.store.dispatch(loadAccounts());
  }
}
