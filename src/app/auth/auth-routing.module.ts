import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationRequiredComponent } from './confirmation-required/confirmation-required.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  },
  {
    path: 'confirmation-required',
    component: ConfirmationRequiredComponent
  },
  {
    path: 'forgot-password', 
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password', 
    component: ResetPasswordComponent
  },
  {
    path: 'sign-in', 
    component: SignInComponent
  },
  {
    path: 'sign-up', 
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
