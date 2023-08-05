import { BucketModel } from "./bucket-model";

export interface CashFlowItemBucketModel {
    cashFlowItemBucketId?: number,
    bucketId: number,
    amount?: number,
    percent?: number,
    bucket?: BucketModel
}