import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AssetModel } from "../../models/asset-model";

export const selectAssetsState = createFeatureSelector<AssetModel[]>('assets');

export const selectAssets = createSelector(
    selectAssetsState,
    (state: AssetModel[]) => state
);