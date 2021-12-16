import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book!: Book;

  constructor(private route: ActivatedRoute, private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.book = new Book('', '');

    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (book: any) => {
        this.book = book
      }
    )
  }
  onBack() {
    this.router.navigate(['/books']);
  }
}
