import { AccountModel } from "./account-model";

export interface CashFlowItemAccountModel {
    cashFlowItemAccountId?: number,
    accountId: number,
    amount?: number,
    percent?: number,
    account?: AccountModel
}