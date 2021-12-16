import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { on } from 'events';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = []
  booksSubject = new Subject<Book[]>()
  constructor(private firebaseAuth: AngularFireAuth, private fireDatabase: AngularFireDatabase) { }

  emitBook() {
    this.booksSubject.next(this.books)
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books)
    // this.fireDatabase.database.ref('/books').set(this.books)
  }
  getBooks() {
    firebase.database().ref('/books').on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBook();
    })
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val())
          })
      }
    )
  }

  createNewBook(newBook: Book) {

    this.books.push(newBook)
    this.saveBooks();
    this.emitBook();
  }

  removeBook(book: Book) {
    if (book.photo) {
      const storage = getStorage();
      const desertRef = ref(storage, book.photo);
      deleteObject(desertRef).then(() => {
        console.log('Fichier supprimé')
      }).catch((error) => {
        console.log('Fichier non trouvé ' + error)
      });
    }

    const bookIndexToRemove = this.books.findIndex(
      bookEl => {
        return bookEl === book
        // A verifier***********************************************
      }
    );

    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBook();
  }


  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {

        const almostUniqueFileName = Date.now().toString();
        console.log('a :',);
        const storage = getStorage();
        const storageRef = ref(storage, `images/${almostUniqueFileName + '-' + file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            resolve(getDownloadURL(uploadTask.snapshot.ref))
          }
        );
      }
    )
  }
}
