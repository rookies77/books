import { Component } from '@angular/core';

import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app'
import { getStorage, ref as sRef, uploadBytesResumable } from 'firebase/storage'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor() {
    const config = {
      apiKey: "AIzaSyAg9kmg05paMC4RJfjmvRdr7XpPq0NAS_s",
      authDomain: "bookshelves-63202.firebaseapp.com",
      databaseURL: "https://bookshelves-63202-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "bookshelves-63202",
      storageBucket: "bookshelves-63202.appspot.com",
      messagingSenderId: "313890572963",
      appId: "1:313890572963:web:98a2a89a67c6fd363acd16"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(config);

  }
}
