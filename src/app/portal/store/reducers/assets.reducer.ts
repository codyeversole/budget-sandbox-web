import { createReducer, on } from '@ngrx/store';
import * as AssetActions from '../actions/assets.actions';
import { AssetModel } from '../../models/asset-model';

const initialState: AssetModel[] = [];

export const assetsReducer = createReducer(
    initialState,
    on(AssetActions.loadAssets, (state: AssetModel[]): AssetModel[] => (state)),
    on(AssetActions.loadAssetsSuccess, (_state: AssetModel[], {payload}): AssetModel[] => (payload)),
    on(AssetActions.loadAssetsError, (): AssetModel[] => ([])),
);