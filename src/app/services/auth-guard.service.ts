import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { LogOut } from '../store/actions/auth.actions';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private store: Store<AppState>) {}
  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.store.dispatch(new LogOut);
      return false;
    }
    return true;
  }
}