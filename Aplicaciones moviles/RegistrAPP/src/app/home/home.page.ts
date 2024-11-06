import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  posts: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Recuperar el nombre de usuario desde localStorage
    this.username = localStorage.getItem('username') || 'Usuario';
    console.log('Nombre de usuario recuperado:', this.username);

    // Cargar los posts
    this.loadPosts();
  }

  ionViewWillEnter() {
    this.username = localStorage.getItem('username') || 'Usuario';
    console.log('Nombre de usuario actualizado:', this.username);
    // Recargar los posts cada vez que se entre a la página
    this.loadPosts();
  }

  loadPosts() {
    this.apiService.getPosts().subscribe(
      (data: any) => {
        this.posts = data;
        console.log('Posts cargados:', this.posts);
      },
      (error) => {
        console.error('Error al cargar los posts:', error);
      }
    );
  }

  editPost(postId: number) {
    console.log('Editando post:', postId);
    // Implementar la navegación a la página de edición
  }
}
