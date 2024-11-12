import { Routes } from '@angular/router';
import { LoginComponent } from './controllers/login/login.component';
import { Controller1Component } from './controllers/controller1/controller1.component';
import { AuthGuardService } from './services/auth/guardURL/auth-guard.service';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'controller1', component: Controller1Component, canActivate: [AuthGuardService] }
];
