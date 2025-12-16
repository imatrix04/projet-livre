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
    year: null,
    available: true,
    image: '' // on mettra le chemin reçu après upload
  };

  selectedFile: File | null = null;
  imageName = '';
  uploadedImageUrl: string | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Si pas de nom personnalisé, on peut récupérer celui du fichier
      if (!this.imageName) {
        this.imageName = file.name;
      }
    }
  }

  uploadImage() {
    if (!this.selectedFile || !this.imageName) {
      alert('Sélectionnez un fichier et donnez-lui un nom.');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile, this.imageName);

    return this.http.post<{ imageUrl: string }>('http://localhost:3000/api/upload', formData);
  }

  onSubmit() {
    this.uploadImage()?.subscribe({
      next: (res) => {
        // imageUrl = chemin accessible sur le serveur
        this.book.image = res.imageUrl;

        // ensuite on poste le livre complet
        this.http.post('http://localhost:3000/api/books', this.book)
          .subscribe({
            next: () => {
              alert('Livre ajouté avec image !');
              this.book = { title: '', author: '', year: null, available: true, image: '' };
              this.selectedFile = null;
              this.imageName = '';
              this.uploadedImageUrl = null;
            },
            error: (err) => {
              console.error(err);
              alert('Erreur lors de l\'ajout du livre');
            }
          });
        this.uploadedImageUrl = res.imageUrl;
      },
      error: (err) => {
        console.error(err);
        alert('Erreur upload image');
      }
    });
  }
}