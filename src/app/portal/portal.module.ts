import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PortalRoutingModule } from './portal-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CrudPanelFormDirective } from './directives/crud-panel-form.directive';
import { CrudPanelTableDirective } from './directives/crud-panel-table.directive';
import { DynamicCrudPanelComponent } from './components/crud-panels/dynamic-crud-panel/dynamic-crud-panel.component';
import { AccountFormComponent } from './components/crud-panels/panel-forms/account-form/account-form.component';
import { AccountTableComponent } from './components/crud-panels/panel-tables/account-table/account-table.component';
import { CashFlowItemFormComponent } from './components/crud-panels/panel-forms/cash-flow-item-form/cash-flow-item-form.component';
import { CashFlowItemTableComponent } from './components/crud-panels/panel-tables/cash-flow-item-table/cash-flow-item-table.component';
import { IMaskModule } from 'angular-imask';
import { BucketFormComponent } from './components/crud-panels/panel-forms/bucket-form/bucket-form.component';
import { BucketTableComponent } from './components/crud-panels/panel-tables/bucket-table/bucket-table.component';
import { AssetFormComponent } from './components/crud-panels/panel-forms/asset-form/asset-form.component';
import { AssetTableComponent } from './components/crud-panels/panel-tables/asset-table/asset-table.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { BucketsComponent } from './components/buckets/buckets.component';
import { AssetsComponent } from './components/assets/assets.component';
import { CashFlowItemsComponent } from './components/cash-flow-items/cash-flow-items.component';
import { ReportCashFlowComponent } from './components/report-cash-flow/report-cash-flow.component';
import { SandboxFormComponent } from './components/crud-panels/panel-forms/sandbox-form/sandbox-form.component';
import { SandboxTableComponent } from './components/crud-panels/panel-tables/sandbox-table/sandbox-table.component';
import { StoreModule } from '@ngrx/store';
import { assetsReducer } from './store/reducers/assets.reducer';
import { AssetsEffects } from './store/effects/assets.effects';
import { EffectsModule } from '@ngrx/effects';
import { sandboxesReducer } from './store/reducers/sandboxes.reducer';
import { accountsReducer } from './store/reducers/accounts.reducer';
import { bucketsReducer } from './store/reducers/buckets.reducer';
import { cashFlowItemsReducer } from './store/reducers/cash-flow-items.reducer';
import { SandboxesEffects } from './store/effects/sandboxes.effects';
import { AccountsEffects } from './store/effects/accounts.effects';
import { BucketsEffects } from './store/effects/buckets.effects';
import { CashFlowItemsEffects } from './store/effects/cash-flow-items.effects';
import { currentSandboxReducer } from './store/reducers/current-sandbox.reducer';
import { reportCashFlowReducer } from './store/reducers/report-cash-flow-reducer';
import { ReportCashFlowEffects } from './store/effects/report-cash-flow.effects';

@NgModule({
  imports: [
    PortalRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    IMaskModule,
    StoreModule.forFeature('currentSandbox', currentSandboxReducer),
    StoreModule.forFeature('sandboxes', sandboxesReducer),
    StoreModule.forFeature('accounts', accountsReducer),
    StoreModule.forFeature('buckets', bucketsReducer),
    StoreModule.forFeature('assets', assetsReducer),
    StoreModule.forFeature('cashFlowItems', cashFlowItemsReducer),
    StoreModule.forFeature('reportCashFlow', reportCashFlowReducer),
    EffectsModule.forFeature(SandboxesEffects),
    EffectsModule.forFeature(AccountsEffects),
    EffectsModule.forFeature(BucketsEffects),
    EffectsModule.forFeature(AssetsEffects),
    EffectsModule.forFeature(CashFlowItemsEffects),
    EffectsModule.forFeature(ReportCashFlowEffects),
  ],
  declarations: [
    PortalComponent,
    NavComponent,
    FooterComponent,
    DashboardComponent,
    SandboxFormComponent,
    SandboxTableComponent,
    DynamicCrudPanelComponent,
    CrudPanelFormDirective,
    CrudPanelTableDirective,
    AccountFormComponent,
    AccountTableComponent,
    CashFlowItemFormComponent,
    CashFlowItemTableComponent,
    BucketFormComponent,
    BucketTableComponent,
    AssetFormComponent,
    AssetTableComponent,
    SideNavComponent,
    AccountsComponent,
    BucketsComponent,
    AssetsComponent,
    CashFlowItemsComponent,
    ReportCashFlowComponent
  ]
})
export class PortalModule { }
