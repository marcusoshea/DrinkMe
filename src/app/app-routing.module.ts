import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { StatusComponent } from './components/status/status.component';


import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
      { path: '', component: LandingComponent },
      { path: '**', redirectTo: '/' }
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
