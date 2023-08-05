import { AssetModel } from "./asset-model";
import { CashFlowItemAccountModel } from "./cash-flow-item-account-model";
import { CashFlowItemBucketModel } from "./cash-flow-item-bucket-model";

export interface CashFlowItemModel {
    sandboxId: number,
    cashFlowItemId?: number
    description: string,
    amount: number,
    frequency: string,
    positive: boolean,
    assetId?: number,
    asset?: AssetModel,
    cashFlowItemAccounts: CashFlowItemAccountModel[];
    cashFlowItemBuckets: CashFlowItemBucketModel[];
}