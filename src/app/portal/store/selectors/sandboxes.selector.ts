import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SandboxModel } from "../../models/sandbox-model";

export const selectSandboxesState = createFeatureSelector<SandboxModel[]>('sandboxes');

export const selectSandboxes = createSelector(
    selectSandboxesState,
    (state: SandboxModel[]) => state
);