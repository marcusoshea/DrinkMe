import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, } from 'rxjs';

import { AppState, selectAuthState } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isAuthenticated: boolean = false;
  errorMessage = null;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    if (localStorage.getItem('token')) {
      this.isAuthenticated = true;
    }
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}
