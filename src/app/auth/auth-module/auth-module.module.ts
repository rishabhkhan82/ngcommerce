import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "../login/login.component";
import { AdminLoginComponent } from "../admin-login/admin-login.component";
import { RegisterComponent } from "../register/register.component";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";


@NgModule({
  declarations: [
    LoginComponent,
    AdminLoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoginComponent,
    AdminLoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent
  ],
  providers: [

  ],
  bootstrap: [

  ]
})

export class AuthModule {

}