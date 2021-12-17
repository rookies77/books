// import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  fileIsUploading = false;
  fileUrl!: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private booksService: BooksService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    })
  }
  onSaveBook() {
    const title = this.bookForm.get('title')?.value;
    const author = this.bookForm.get('author')?.value;
    const newBook = new Book(title, author);
    if(this.fileUrl && this.fileUrl != ''){
      newBook.photo = this.fileUrl
    }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books'])
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file)
      .then(
        (url: any) => {
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
        }
      )

  }

  detectFiles(event: any) {
    this.onUploadFile(event.target.files[0])
    console.log(' this.onUploadFile(event.target.files[0]):', event);
  }
}
