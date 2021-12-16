import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isAuth!: boolean;
  constructor(private router: Router, private firebaseAuth: AngularFireAuth, private authService: AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        this.firebaseAuth.onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true)
            }else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false)
            }
          }
        )
      }
    )

  }

}
