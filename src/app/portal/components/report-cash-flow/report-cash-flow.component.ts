import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { currencyMaskOptions } from 'src/app/shared/mask-options/currency-mask-options';
import { percentShortMaskOptions } from 'src/app/shared/mask-options/percent-mask-options';
import { ReportCashFlowModel } from '../../models/report-cash-flow-model';
import { Store } from '@ngrx/store';
import { selectReportCashFlow } from '../../store/selectors/report-cash-flow.selector';

@Component({
  selector: 'app-report-cash-flow',
  templateUrl: './report-cash-flow.component.html',
  styleUrls: ['./report-cash-flow.component.scss']
})
export class ReportCashFlowComponent {
  public currencyMaskOptions = currencyMaskOptions;
  public percentShortMaskOptions = percentShortMaskOptions;
  public reportCashFlow$: Observable<ReportCashFlowModel> = this.store.select(selectReportCashFlow);

  constructor(
    private store: Store
  ) { }

}
