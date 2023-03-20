import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { ConfirmationRequiredComponent } from './confirmation-required/confirmation-required.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UnlockSessionComponent } from './unlock-session/unlock-session.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    SignInComponent,
    SignOutComponent,
    ConfirmationRequiredComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignUpComponent,
    UnlockSessionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
