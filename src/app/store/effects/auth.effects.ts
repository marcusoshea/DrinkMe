import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure,
  LogOut,
} from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  Login = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this.authService.logIn(payload.username, payload.password).pipe(
          map((user) => {
            return new LogInSuccess({ token: user.token, username: user.username, firstName: user.firstName, lastName: user.lastName });
          }),
          catchError((error) => {
            return of(new LogInFailure({ error: error }));
          }));
      })
    )
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user: any) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('username', user.payload.username);
      localStorage.setItem('firstName', user.payload.firstName);
      localStorage.setItem('lastName', user.payload.lastName);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  SignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.SIGNUP),
      map((action: SignUp) => action.payload),
      switchMap(payload => {
        return this.authService.signUp(payload.username, payload.password, payload.firstName, payload.lastName).pipe(
          map((user) => {
            return new SignUpSuccess({ token: user.token, username: user.username, firstName: user.firstName, lastName: user.lastName });
          }),
          catchError((error) => {
            return of(new SignUpFailure({ error: error }));
          }));
      })
    )
  ); 

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user: any) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('username', user.payload.username);
      localStorage.setItem('firstName', user.payload.firstName);
      localStorage.setItem('lastName', user.payload.lastName);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      this.router.navigateByUrl('/log-in');
    })
  );

}
