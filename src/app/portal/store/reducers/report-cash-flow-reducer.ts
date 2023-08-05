import { createReducer, on } from '@ngrx/store';
import * as ReportCashFlowActions from '../actions/report-cash-flow.actions';
import { ReportCashFlowModel } from '../../models/report-cash-flow-model';

const initialState: ReportCashFlowModel = {
    dailyCashFlow: 0,
    weeklyCashFlow: 0,
    monthlyCashFlow: 0,
    yearlyCashFlow: 0,
    savePercentage: 0
}

export const reportCashFlowReducer = createReducer(
    initialState,
    on(ReportCashFlowActions.loadReportCashFlow, (state: ReportCashFlowModel): ReportCashFlowModel => (state)),
    on(ReportCashFlowActions.loadReportCashFlowSuccess, (_state: ReportCashFlowModel, {payload}): ReportCashFlowModel => (payload)),
    on(ReportCashFlowActions.loadReportCashFlowError, (): ReportCashFlowModel => (initialState)),
);