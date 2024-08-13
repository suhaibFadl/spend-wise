import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TransactionComponent } from './transaction/transaction.component';
import { authenticatedGuard, authGuard } from './shared/auth/auth.guard';
import { InitialTransactionComponent } from './transaction/initial-transaction/initial-transaction.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate: [authenticatedGuard]},
  { path: 'login', component: LoginComponent, canActivate: [authenticatedGuard]},
  { path: 'home', component: TransactionComponent, canActivate: [authGuard]},
  { path: 'statistics', component: StatisticsComponent, canActivate: [authGuard]},
  { path: 'initail-transaction', component: InitialTransactionComponent, canActivate: [authGuard]},
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
