import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReportCashFlowModel } from "../../models/report-cash-flow-model";

export const selectReportCashFlowState = createFeatureSelector<ReportCashFlowModel>('reportCashFlow');

export const selectReportCashFlow = createSelector(
    selectReportCashFlowState,
    (state: ReportCashFlowModel) => state
);