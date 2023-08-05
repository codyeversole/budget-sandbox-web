import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { currentSandboxChange } from '../actions/current-sandbox.actions';
import { loadReportCashFlow } from '../actions/report-cash-flow.actions';
import { ReportClientService } from '../../services/clients/report-client.service';
import { loadCashFlowItemsSuccess } from '../actions/cash-flow-items.actions';
 
@Injectable()
export class ReportCashFlowEffects {
 
  loadReportCashFlow$ = createEffect(() => { return this.actions$.pipe(
    ofType(loadReportCashFlow, currentSandboxChange, loadCashFlowItemsSuccess),
    exhaustMap(() => this.reportClient.get()
      .pipe(
        map(reportCashFlow => {
            console.log(reportCashFlow)
            return ({ type: '[Component] ReportCashFlow Success', payload: reportCashFlow })
    }),
        catchError((error) => {
            console.log(error);
            return  of({ type: '[Component] ReportCashFlow Error' });
        })
      ))
    ) }
  );
 
  constructor(
    private actions$: Actions,
    private reportClient: ReportClientService
  ) {}
}