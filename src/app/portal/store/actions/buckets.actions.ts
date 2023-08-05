import { createAction, props } from '@ngrx/store';
import { BucketModel } from '../../models/bucket-model';

export const loadBuckets = createAction(
    '[Component] Buckets'
);

export const loadBucketsSuccess = createAction(
    '[Component] Buckets Success',
    props<{ payload: BucketModel[] }>()
);

export const loadBucketsError = createAction(
    '[Component] Buckets Error'
);
