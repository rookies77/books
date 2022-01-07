import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BooksService } from './services/books.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { DragAndDropDirective } from './directive/drag-and-drop.directive';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', canActivate: [AuthGuardService], component: BookListComponent },
  { path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent },
  { path: 'books/view/:id',canActivate: [AuthGuardService],component: SingleBookComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full'},
  { path: '**', redirectTo: 'books' },
]

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    BookListComponent,
    BookFormComponent,
    SingleBookComponent,
    HeaderComponent,
    DragAndDropDirective,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAg9kmg05paMC4RJfjmvRdr7XpPq0NAS_s",
      authDomain: "bookshelves-63202.firebaseapp.com",
      databaseURL: "https://bookshelves-63202-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "bookshelves-63202",
      storageBucket: "bookshelves-63202.appspot.com",
      messagingSenderId: "313890572963",
      appId: "1:313890572963:web:98a2a89a67c6fd363acd16"
    }),
    AngularFireDatabaseModule,


  ],
  providers: [
    AuthService,
    AuthGuardService,
    BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
