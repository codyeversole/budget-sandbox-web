import { createReducer, on } from '@ngrx/store';
import * as BucketActions from '../actions/buckets.actions';
import { BucketModel } from '../../models/bucket-model';

const initialState: BucketModel[] = [];

export const bucketsReducer = createReducer(
    initialState,
    on(BucketActions.loadBuckets, (state: BucketModel[]): BucketModel[] => (state)),
    on(BucketActions.loadBucketsSuccess, (_state: BucketModel[], {payload}): BucketModel[] => (payload)),
    on(BucketActions.loadBucketsError, (): BucketModel[] => ([])),
);