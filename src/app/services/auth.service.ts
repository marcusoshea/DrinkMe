import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../models/user';
import { AppConfigService } from './app-config.service';
import { AppState } from '../store/app.states';
import { LogOut } from '../store/actions/auth.actions';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private appConfigService: AppConfigService, private store: Store<AppState>) { }


  
  getToken(): string {
    let currentToken = localStorage.getItem('token');
    if (currentToken) {
      return currentToken;
    }    
    this.store.dispatch(new LogOut);
    return '';
  }

  logIn(username: string, password: string): Observable<any> {
    const url = `${this.appConfigService.apiBaseUrl}/Users/authenticate`;
    return this.http.post<User>(url, { "username": username, "password": password });
  }

  signUp(username: string, password: string, firstName: string, lastName: string): Observable<User> {
    const url = `${this.appConfigService.apiBaseUrl}/Users/register`;
    return this.http.post<User>(url, { "firstName": firstName, "lastName": lastName, "username": username, "password": password });
  }

  getStatus(): Observable<User> {
    const url = `${this.appConfigService.apiBaseUrl}/status`;
    return this.http.get<User>(url);
  }
}
