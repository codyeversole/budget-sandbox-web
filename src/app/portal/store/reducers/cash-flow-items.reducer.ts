import { createReducer, on } from '@ngrx/store';
import * as CashFlowItemActions from '../actions/cash-flow-items.actions';
import { CashFlowItemModel } from '../../models/cash-flow-item-model';

const initialState: CashFlowItemModel[] = [];

export const cashFlowItemsReducer = createReducer(
    initialState,
    on(CashFlowItemActions.loadCashFlowItems, (state: CashFlowItemModel[]): CashFlowItemModel[] => (state)),
    on(CashFlowItemActions.loadCashFlowItemsSuccess, (_state: CashFlowItemModel[], {payload}): CashFlowItemModel[] => (payload)),
    on(CashFlowItemActions.loadCashFlowItemsError, (): CashFlowItemModel[] => ([])),
);