import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Bibliothèque Numérique';

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

}
