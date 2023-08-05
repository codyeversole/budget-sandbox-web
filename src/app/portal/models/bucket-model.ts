import { AccountBucketModel } from "./account-bucket-model";

export interface BucketModel {
    sandboxId: number,
    bucketId?: number,
    description: string,
    balance: number,
    goalBalance?: number,
    goalAchieved: boolean,
    positive: boolean,
    archived: boolean,
    accountBuckets: AccountBucketModel[]
}