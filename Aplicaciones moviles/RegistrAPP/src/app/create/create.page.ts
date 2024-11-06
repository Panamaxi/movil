import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Post } from '../services/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {
  // Definir las propiedades que usas en el template
  title: string = '';
  body: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  createPost() {
    const newPost: Post = {
      title: this.title,
      content: this.body
    };

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
