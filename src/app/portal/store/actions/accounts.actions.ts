import { createAction, props } from '@ngrx/store';
import { AccountModel } from '../../models/account-model';

export const loadAccounts = createAction(
    '[Component] Accounts'
);

export const loadAccountsSuccess = createAction(
    '[Component] Accounts Success',
    props<{ payload: AccountModel[] }>()
);

export const loadAccountsError = createAction(
    '[Component] Accounts Error'
);
