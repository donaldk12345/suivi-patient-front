import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { FirstChangePasswordComponent } from './first-change-password/first-change-password.component';

const routes: Routes = [
  { path: "forgot-password", component: ForgetpasswordComponent },
  { path: "reset-password", component: ResetpasswordComponent },
  { path: "change-first-password", component: FirstChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
