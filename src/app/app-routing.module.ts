import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/public/auth/authentication/authentication.component';

const routes: Routes = [
  { path: "login", component: AuthenticationComponent },
  { path: '', redirectTo:'login',pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
