import { createAction, props } from '@ngrx/store';
import { ReportCashFlowModel } from '../../models/report-cash-flow-model';

export const loadReportCashFlow = createAction(
    '[Component] Load ReportCashFlow'
);

export const loadReportCashFlowSuccess = createAction(
    '[Component] ReportCashFlow Success',
    props<{ payload: ReportCashFlowModel }>()
);

export const loadReportCashFlowError = createAction(
    '[Component] ReportCashFlow Error'
);