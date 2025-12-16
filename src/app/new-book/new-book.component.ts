import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent {
  book = {
    title: '',
    author: '',
    year: null as number | null,
    available: true,
    image: ''
  };

  message = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/books', this.book)
      .subscribe({
        next: (res) => {
          this.message = 'Livre ajouté avec succès !';
          this.book = { title: '', author: '', year: null, available: true, image: '' };
        },
        error: (err) => {
          this.message = 'Erreur lors de l\'ajout du livre.';
          console.error(err);
        }
      });
  }
}
