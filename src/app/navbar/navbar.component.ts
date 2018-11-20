import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  public isLoggedIn: boolean = false;
  private email: string;

  constructor(public fireAuth: AngularFireAuth, private routing: Router) {
    this.user = fireAuth.authState;

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this.routing.navigate(['/login']);
      }
    });
   }

  ngOnInit() {
  }

  logout() {
    this.fireAuth.auth.signOut();
    this.isLoggedIn = false;
  }

}
