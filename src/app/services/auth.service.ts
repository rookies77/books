import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor(private firebaseAuth: AngularFireAuth) { }


  // async createUser(email: string, password: string) {
  //   await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(
  //     (res) => {
  //       this.isLoggedIn = true;
  //       localStorage.setItem('user', JSON.stringify(res.user))
  //     }
  //   )
  // }

  createUser(email: string, password: string) { // 2e maniere de faire
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          ()=> {
            resolve(true);
          },
          (error)=>{
            reject(error)
          }
        )
      }
    )
  }
//   signInUser(email: string, password: string) {
// return new Promise(
//   (resolve, reject)=>{
//     firebase.auth().signInWithEmailAndPassword(email, password).then(
//       ()=>{
//         resolve(true);
//       },
//       (error)=>{
//         reject(error)
//       }
//     )
//   }
// )
  // }

  async signInUser(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user))
      }
    )
  }

  signOutUser() {
    this.firebaseAuth.signOut();
    this.isLoggedIn = false;
    console.log('this.isLoggedIn :', this.isLoggedIn);
    localStorage.removeItem('user');
  }
}
