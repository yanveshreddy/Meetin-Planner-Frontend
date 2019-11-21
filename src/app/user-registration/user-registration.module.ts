import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SignupComponent, SigninComponent, ForgotpasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild ([
      {path:"signup",component:SignupComponent},
      {path:"signin",component:SigninComponent},
      {path:"forgot-password",component:ForgotpasswordComponent}
    ]),
  ]
})
export class UserRegistrationModule { }
