import { AccountModel } from "./account-model";

export interface AccountBucketModel {
    accountBucketId?: number,
    accountId: number,
    amount?: number,
    percent?: number,
    account?: AccountModel
}