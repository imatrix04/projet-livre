import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
  searchTerm: string = '';

  books = [
    {
      title: '1984',
      author: 'George Orwell',
      year: 1949,
      available: true,
      image: 'assets/images/1984_Orwell.jpg'
    },
    {
      title: 'Le Seigneur des Anneaux',
      author: 'J.R.R. Tolkien',
      year: 1954,
      available: false,
      image: 'assets/images/LeSeigneurDesAnneaux_Tolkien.jpg'
    },
    {
      title: 'L’Étranger',
      author: 'Albert Camus',
      year: 1942,
      available: true,
      image: 'assets/images/Letranger_Camus.jpg'
    }
  ];

  get filteredBooks() {
    if (!this.searchTerm) {
      return this.books;
    }
    console.log(this.searchTerm);
    
    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
