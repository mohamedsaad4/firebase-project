import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password: string ;

  constructor(private fire: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  myLogin() {
    this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.router.navigate(['/home']);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('email', this.fire.auth.currentUser.email);

          this.fire.authState.subscribe(auth => {
            if (auth) {
              localStorage.setItem('uid', auth.uid);
            }
          });

        }).catch(error => {
          console.error(error);
        });
  }

}
