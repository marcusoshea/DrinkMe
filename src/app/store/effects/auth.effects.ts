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
  LogOut, ForgotPassword
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

  LogInSuccess = createEffect(() =>
  this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user: any) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('username', user.payload.username);
      localStorage.setItem('firstName', user.payload.firstName);
      localStorage.setItem('lastName', user.payload.lastName);
      this.router.navigateByUrl('/');
    })
  ), { dispatch: false });
  

  LogInFailure = createEffect(() =>
  this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  ), { dispatch: false });


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
            console.log(error);
            return of(new SignUpFailure({ error: error }));
          }));
      })
    )
  );

  //TODO need to add a return action, this is working but popping an error in console, need to create ForgotPasswordSuccess/ForgotPasswordFailure like Signup pattern
  ForgotPassword = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.FORGOT_PASSWORD),
      map((action: ForgotPassword) => action.payload),
      switchMap(payload => {
        return this.authService.forgotPassword(payload.username).pipe(
          map((user) => {
            console.log(user);
            return user;
          }),
          catchError((error) => {
            console.log(error);
            return error;
          }));
      })
    )
  );

  SignUpSuccess = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.SIGNUP_SUCCESS),
      tap((user: any) => {
        localStorage.setItem('token', user.payload.token);
        localStorage.setItem('username', user.payload.username);
        localStorage.setItem('firstName', user.payload.firstName);
        localStorage.setItem('lastName', user.payload.lastName);
        this.router.navigateByUrl('/');
      })
    ), { dispatch: false });

  SignUpFailure = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.SIGNUP_FAILURE)
    ), { dispatch: false });


  LogOut = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.LOGOUT),
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        this.router.navigateByUrl('/log-in');
      }))
    , { dispatch: false });
}
