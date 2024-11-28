import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import * as QRCode from 'qrcode'; // Importa la biblioteca QRCode

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  posts: any[] = [];
  qrCodeData: string = ''; // Variable para almacenar el código QR generado

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Recuperar el nombre de usuario desde localStorage
    this.username = localStorage.getItem('username') || 'Usuario';
    console.log('Nombre de usuario recuperado:', this.username);

    
    this.generateQRCode();

    // Cargar los posts
    this.loadPosts();
  }

  ionViewWillEnter() {
    this.username = localStorage.getItem('username') || 'Usuario';
    console.log('Nombre de usuario actualizado:', this.username);

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
  }

 
  generateQRCode() {
    const data = "Alumno: Nara, Asignatura: Programación Móvil"; 
    QRCode.toDataURL(data, { errorCorrectionLevel: 'M', width: 256 })
      .then((url: string) => {
        this.qrCodeData = url; // Guarda la URL del código QR generado
        console.log('Código QR generado:', this.qrCodeData);
      })
      .catch((err: any) => {
        console.error('Error generando el código QR:', err);
      });
  }
}
