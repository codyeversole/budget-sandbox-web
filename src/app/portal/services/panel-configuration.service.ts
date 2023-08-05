import { DynamicCrudPanelConfiguration } from "src/app/portal/models/dynamic-crud-panel-configuration";
import { SandboxModel } from "src/app/portal/models/sandbox-model";
import { Injectable } from "@angular/core";
import { AccountClientService } from "./clients/account-client.service";
import { AccountModel } from "../models/account-model";
import { AccountFormComponent } from "../components/crud-panels/panel-forms/account-form/account-form.component";
import { AccountTableComponent } from "../components/crud-panels/panel-tables/account-table/account-table.component";
import { CashFlowItemModel } from "../models/cash-flow-item-model";
import { CashFlowItemClientService } from "./clients/cash-flow-item-client.service";
import { CashFlowItemFormComponent } from "../components/crud-panels/panel-forms/cash-flow-item-form/cash-flow-item-form.component";
import { CashFlowItemTableComponent } from "../components/crud-panels/panel-tables/cash-flow-item-table/cash-flow-item-table.component";
import { BucketModel } from "../models/bucket-model";
import { BucketClientService } from "./clients/bucket-client.service";
import { AssetClientService } from "./clients/asset-client.service";
import { BucketFormComponent } from "../components/crud-panels/panel-forms/bucket-form/bucket-form.component";
import { BucketTableComponent } from "../components/crud-panels/panel-tables/bucket-table/bucket-table.component";
import { AssetFormComponent } from "../components/crud-panels/panel-forms/asset-form/asset-form.component";
import { AssetTableComponent } from "../components/crud-panels/panel-tables/asset-table/asset-table.component";
import { AssetModel } from "../models/asset-model";
import { SandboxClientService } from "./clients/sandbox-client.service";
import { SandboxFormComponent } from "../components/crud-panels/panel-forms/sandbox-form/sandbox-form.component";
import { SandboxTableComponent } from "../components/crud-panels/panel-tables/sandbox-table/sandbox-table.component";

@Injectable({
    providedIn: 'root',
})
export class PanelConfigurationService {

    constructor(
        private sandboxClient: SandboxClientService,
        private accountClient: AccountClientService,
        private cashFlowItemClient: CashFlowItemClientService,
        private bucketClient: BucketClientService,
        private assetClient: AssetClientService,
    ) { }

    public sandboxPanelConfiguration: DynamicCrudPanelConfiguration<SandboxModel> = {   
        pascalCaseItemName: 'Sandbox',
        pascalCaseItemPluralName: 'Sandboxes',
        icon: 'fa-chart-pie',
        dynamicCrudPanelClient: this.sandboxClient,
        formComponent: SandboxFormComponent,
        tableComponent: SandboxTableComponent,
    }

    public accountPanelConfiguration: DynamicCrudPanelConfiguration<AccountModel> = {   
        pascalCaseItemName: 'Account',
        pascalCaseItemPluralName: 'Accounts',
        icon: 'fa-building-columns',
        dynamicCrudPanelClient: this.accountClient,
        formComponent: AccountFormComponent,
        tableComponent: AccountTableComponent,
    }

    public cashFlowItemPanelConfiguration: DynamicCrudPanelConfiguration<CashFlowItemModel> = {   
        pascalCaseItemName: 'Cash Flow Item',
        pascalCaseItemPluralName: 'Cash Flow Items',
        icon: 'fa-money-check-dollar',
        dynamicCrudPanelClient: this.cashFlowItemClient,
        formComponent: CashFlowItemFormComponent,
        tableComponent: CashFlowItemTableComponent,
    }

    public bucketPanelConfiguration: DynamicCrudPanelConfiguration<BucketModel> = {
        pascalCaseItemName: "Bucket",
        pascalCaseItemPluralName: "Buckets",
        icon: 'fa-bucket',
        dynamicCrudPanelClient: this.bucketClient,
        formComponent: BucketFormComponent,
        tableComponent: BucketTableComponent,
    }

    public assetPanelConfiguration: DynamicCrudPanelConfiguration<AssetModel> = {
        pascalCaseItemName: "Asset",
        pascalCaseItemPluralName: "Assets",
        icon: 'fa-sack-dollar',
        dynamicCrudPanelClient: this.assetClient,
        formComponent: AssetFormComponent,
        tableComponent: AssetTableComponent,
    }
}
