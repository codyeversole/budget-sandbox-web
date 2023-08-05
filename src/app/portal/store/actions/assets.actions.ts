import { createAction, props } from '@ngrx/store';
import { AssetModel } from '../../models/asset-model';

export const loadAssets = createAction(
    '[Component] Assets'
);

export const loadAssetsSuccess = createAction(
    '[Component] Assets Success',
    props<{ payload: AssetModel[] }>()
);

export const loadAssetsError = createAction(
    '[Component] Assets Error'
);
