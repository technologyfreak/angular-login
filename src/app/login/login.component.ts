import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this.loginError = null;
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      this.router.navigate([`tasks/${this.afAuth.auth.currentUser.email}`.toString()]);
    }).catch(reason => {
      this.loginError = reason;
    });
  }
}
