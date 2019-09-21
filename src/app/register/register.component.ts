import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationError: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  register(email: string, password: string) {
    this.registrationError = null;
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.router.navigate([`tasks/${this.afAuth.auth.currentUser.email}`.toString()]);
    }).catch(reason => {
      this.registrationError = reason;
    });
  }

}
