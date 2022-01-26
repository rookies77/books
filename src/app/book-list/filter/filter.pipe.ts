import { Pipe, PipeTransform } from "@angular/core";
import { Book } from "src/app/models/book.model";



@Pipe({
   name: 'FilterPipe'
})

export class FilterPipe implements PipeTransform {
   transform(value: Book[], input: any): any {
      if (input) {
         return value.filter(val => val.title.toLowerCase().indexOf(input.toLowerCase()) >= 0);
      } else {
         return value;
      }

   }

}
