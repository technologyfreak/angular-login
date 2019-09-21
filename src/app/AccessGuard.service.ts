import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const email = this.afAuth.auth.currentUser.email;

    if (this.afAuth.auth && this.router.parseUrl(email)) {
      return true;
    }
    
    return false;
  }
}
