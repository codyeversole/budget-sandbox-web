import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SandboxModel } from "../../models/sandbox-model";

export const selectCurrentSandboxState = createFeatureSelector<SandboxModel | undefined>('currentSandbox');

export const selectCurrentSandbox = createSelector(
    selectCurrentSandboxState,
    (state: SandboxModel | undefined) => state
);