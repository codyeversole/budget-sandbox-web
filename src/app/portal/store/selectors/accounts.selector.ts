import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AccountModel } from "../../models/account-model";

export const selectAccountsState = createFeatureSelector<AccountModel[]>('accounts');

export const selectAccounts = createSelector(
    selectAccountsState,
    (state: AccountModel[]) => state
);