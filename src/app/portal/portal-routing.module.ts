import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { BucketsComponent } from './components/buckets/buckets.component';
import { AssetsComponent } from './components/assets/assets.component';
import { CashFlowItemsComponent } from './components/cash-flow-items/cash-flow-items.component';

const routes: Routes = [  
  { path: '', component: PortalComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'accounts', component: AccountsComponent },
    { path: 'buckets', component: BucketsComponent },
    { path: 'assets', component: AssetsComponent },
    { path: 'cashflowitems', component: CashFlowItemsComponent },
  ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortalRoutingModule { }
