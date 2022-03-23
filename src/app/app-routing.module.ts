import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountBalancesComponent } from './account-balances/account-balances.component';
import { BalancesChartComponent } from './balances-chart/balances-chart.component';
import { HomeComponent } from './home/home.component';
import { ImportBalancesComponent } from './import-balances/import-balances.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'account-balances', component: AccountBalancesComponent },
  { path: 'balances-chart', component: BalancesChartComponent },
  { path: 'import-balances', component: ImportBalancesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
