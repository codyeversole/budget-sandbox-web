import { createAction, props } from '@ngrx/store';
import { CashFlowItemModel } from '../../models/cash-flow-item-model';

export const loadCashFlowItems = createAction(
    '[Component] CashFlowItems'
);

export const loadCashFlowItemsSuccess = createAction(
    '[Component] CashFlowItems Success',
    props<{ payload: CashFlowItemModel[] }>()
);

export const loadCashFlowItemsError = createAction(
    '[Component] CashFlowItems Error'
);
