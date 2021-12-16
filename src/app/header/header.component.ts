import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth!: boolean;
  constructor(private firebaseAuth: AngularFireAuth, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.firebaseAuth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    )

  }
  onSignOut() {
    this.authService.signOutUser()
    this.router.navigate(['/auth', 'signin'])
  }
}
