import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';

  constructor() {}

  ngOnInit() {
    // Recuperar el nombre de usuario desde localStorage
    this.username = localStorage.getItem('username') || 'Usuario';
    console.log('Nombre de usuario recuperado:', this.username); // Para depuración
  }

  ionViewWillEnter() {
    // Actualizar el nombre de usuario cada vez que se entre a la página
    this.username = localStorage.getItem('username') || 'Usuario';
    console.log('Nombre de usuario actualizado:', this.username); // Para depuración
  }
}