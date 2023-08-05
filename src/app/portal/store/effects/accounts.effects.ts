import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AccountClientService } from '../../services/clients/account-client.service';
import { loadAccounts } from '../actions/accounts.actions';
import { currentSandboxChange } from '../actions/current-sandbox.actions';
 
@Injectable()
export class AccountsEffects {
 
  loadAccounts$ = createEffect(() => { return this.actions$.pipe(
    ofType(loadAccounts, currentSandboxChange),
    exhaustMap(() => this.accountClient.getAll()
      .pipe(
        map(accounts => {
            console.log(accounts)
            return ({ type: '[Component] Accounts Success', payload: accounts })
    }),
        catchError((error) => {
            console.log(error);
            return  of({ type: '[Component] Accounts Error' });
        })
      ))
    ) }
  );
 
  constructor(
    private actions$: Actions,
    private accountClient: AccountClientService
  ) {}
}