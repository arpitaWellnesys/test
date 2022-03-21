import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path : "" , redirectTo : '/login' , pathMatch : 'full'},
  {path : "login" , component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : "forget-password" , component : ForgetPasswordComponent },
  {path : "reset-password/:id" , component : ResetPasswordComponent },
  {path : "verify-otp/:id" , component :  OtpComponent},
  {path: "dashboard" , component : DashboardComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
