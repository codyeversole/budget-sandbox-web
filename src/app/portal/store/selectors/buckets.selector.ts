import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BucketModel } from "../../models/bucket-model";

export const selectBucketsState = createFeatureSelector<BucketModel[]>('buckets');

export const selectBuckets = createSelector(
    selectBucketsState,
    (state: BucketModel[]) => state
);