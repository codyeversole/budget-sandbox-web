import { createReducer, on } from '@ngrx/store';
import * as AccountActions from '../actions/accounts.actions';
import { AccountModel } from '../../models/account-model';

const initialState: AccountModel[] = [];

export const accountsReducer = createReducer(
    initialState,
    on(AccountActions.loadAccounts, (state: AccountModel[]): AccountModel[] => (state)),
    on(AccountActions.loadAccountsSuccess, (_state: AccountModel[], {payload}): AccountModel[] => (payload)),
    on(AccountActions.loadAccountsError, (): AccountModel[] => ([])),
);