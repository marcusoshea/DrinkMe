import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';


@Injectable()
export class AuthService {
  //TODO: Move this to config, shouldn't be hardcoded.
  private BASE_URL = 'http://drinkapi.imaginedthenmade.com:8001/pokeapi';

  constructor(private http: HttpClient) {}

  getToken(): string {
      let currentToken = localStorage.getItem('token');
      if (currentToken) {
        return currentToken;
      } 
      return '';
  }

  logIn(username: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/Users/authenticate`;
    return this.http.post<User>(url, {"username": username, "password": password});
  }

  signUp(username: string, password: string, firstName: string, lastName: string): Observable<User> {
    const url = `${this.BASE_URL}/Users/register`;
    return this.http.post<User>(url, {"firstName": firstName, "lastName": lastName, "username": username, "password": password});
  }

  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }
}
