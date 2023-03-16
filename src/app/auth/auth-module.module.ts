import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

const routes : Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

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
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    AdminLoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
  ],
  providers: [
    
  ],
  bootstrap: [

  ]
})

export class AuthModule {
  constructor() {
    console.log('auth module lazily loaded');
  }
}
