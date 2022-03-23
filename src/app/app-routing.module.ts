import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountBalancesComponent } from './account-balances/account-balances.component';
import { BalancesChartComponent } from './balances-chart/balances-chart.component';
import { ImportBalancesComponent } from './import-balances/import-balances.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'account-balances', component: AccountBalancesComponent },
  { path: 'balances-chart', component: BalancesChartComponent },
  { path: 'import-balances', component: ImportBalancesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
