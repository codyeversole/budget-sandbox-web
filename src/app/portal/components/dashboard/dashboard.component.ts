import { Component } from '@angular/core';
import { PanelConfigurationService } from '../../services/panel-configuration.service';
import { ReportCashFlowModel } from '../../models/report-cash-flow-model';
import { currencyMaskOptions } from 'src/app/shared/mask-options/currency-mask-options';
import { percentShortMaskOptions } from 'src/app/shared/mask-options/percent-mask-options';
import { Store } from '@ngrx/store';
import { loadSandboxes } from '../../store/actions/sandboxes.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public reportCashFlow: ReportCashFlowModel | undefined;
  public currencyMaskOptions = currencyMaskOptions;
  public percentShortMaskOptions = percentShortMaskOptions;

  constructor(
    public panelConfigurationService: PanelConfigurationService,
    private store: Store,
  ) { }

  public sandboxChanged(): void {
    this.store.dispatch(loadSandboxes());
  }

}
