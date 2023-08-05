import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { CashFlowItemClientService } from '../../services/clients/cash-flow-item-client.service';
import { loadCashFlowItems } from '../actions/cash-flow-items.actions';
import { currentSandboxChange } from '../actions/current-sandbox.actions';
 
@Injectable()
export class CashFlowItemsEffects {
 
  loadCashFlowItems$ = createEffect(() => { return this.actions$.pipe(
    ofType(loadCashFlowItems, currentSandboxChange),
    exhaustMap(() => this.cashFlowItemClient.getAll()
      .pipe(
        map(cashFlowItems => {
            console.log(cashFlowItems)
            return ({ type: '[Component] CashFlowItems Success', payload: cashFlowItems })
    }),
        catchError((error) => {
            console.log(error);
            return  of({ type: '[Component] CashFlowItems Error' });
        })
      ))
    ) }
  );
 
  constructor(
    private actions$: Actions,
    private cashFlowItemClient: CashFlowItemClientService
  ) {}
}