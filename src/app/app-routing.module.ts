import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

import { AuthGuard } from "./auth.guard";
import { FormComponent } from './components/form/form.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormCreateComponent } from './components/form-create/form-create.component';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { FormDetailsComponent } from './components/form-details/form-details.component';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MapsComponent } from './components/maps/maps.component';
import { ChartAnswerComponent } from './components/chart-answer/chart-answer.component';
import { UsersComponent } from './components/users/users.component';
import { PaymentComponent } from './components/payment/payment.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path:'',
    component: MenuComponent,
    children:[
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'email-verification', component: VerifyEmailComponent },
      { path: 'form', component: FormComponent },
      { path: 'form-create', component: FormCreateComponent },
      { path: 'form-edit/:id', component: FormEditComponent },
      { path: 'form-details/:id', component: FormDetailsComponent },
      { path: 'chart', component: MyBarChartComponent },
      { path: 'maps', component: MapsComponent },
      { path: 'analytics', component: ChartAnswerComponent },
      { path: 'users', component: UsersComponent },
      { path: 'payment', component: PaymentComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

