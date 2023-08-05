import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CashFlowItemModel } from "../../models/cash-flow-item-model";

export const selectCashFlowItemsState = createFeatureSelector<CashFlowItemModel[]>('cashFlowItems');

export const selectCashFlowItems = createSelector(
    selectCashFlowItemsState,
    (state: CashFlowItemModel[]) => state
);