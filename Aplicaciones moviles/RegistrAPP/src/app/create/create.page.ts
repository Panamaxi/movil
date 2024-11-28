import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Post } from '../services/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {
  title: string = '';
  body: string = '';
  qrData: string = ''; // Nueva propiedad para almacenar los datos del QR

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  // Función que se ejecuta cuando se crea un post
  createPost() {
    const newPost: Post = {
      title: this.title,
      content: this.body
    };

   
    this.qrData = `Título: ${this.title}\nContenido: ${this.body}`;

    this.apiService.createPost(newPost).subscribe({
      next: (response) => {
        console.log('Post creado exitosamente', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al crear el post', error);
      }
    });
  }
}
