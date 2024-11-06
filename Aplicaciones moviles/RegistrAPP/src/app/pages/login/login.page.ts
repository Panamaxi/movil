import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private toastController: ToastController,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    await this.checkAuthStatus();
    await this.loadSavedUsername();
  }

  async checkAuthStatus() {
    const token = await this.storageService.get('authToken');
    this.isAuthenticated = !!token;
  }

  async loadSavedUsername() {
    const savedUsername = await this.getUsernameFromStorage();
    if (savedUsername) {
      this.username = savedUsername;
    }
  }

  async login() {
    if (!this.username || !this.password) {
      await this.showAlert('Error', 'Por favor, completa todos los campos');
      return;
    }

    if (this.username === 'Nara' && this.password === '12345') {
      const fakeToken = 'fake-jwt-token';
      await this.storageService.set('authToken', fakeToken);
      await this.storageService.set('username', this.username);
      this.isAuthenticated = true;
      this.router.navigate(['/home']);
    } else {
      await this.showAlert('Error', 'Usuario o contraseña incorrectos');
    }
  }

  async logout() {
    await this.clearStorage();
    this.isAuthenticated = false;
    await this.showToast('Sesión cerrada exitosamente');
    this.router.navigate(['/login']);
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  loginWithFacebook() {
    console.log('Inicio de sesión con Facebook');
    // Implementar lógica de inicio de sesión con Facebook
  }

  loginWithGoogle() {
    console.log('Inicio de sesión con Google');
    // Implementar lógica de inicio de sesión con Google
  }

  // Nuevas funciones implementadas
  async loginUser(email: string, password: string) {
    // Aquí simularías el proceso de login
    await this.storageService.set('username', email);
    console.log('Usuario guardado');
    await this.showToast('Usuario guardado exitosamente');
  }

  async getUsernameFromStorage() {
    const username = await this.storageService.get('username');
    console.log('Usuario guardado:', username);
    if (username) {
      await this.showToast(`Usuario guardado: ${username}`);
    } else {
      await this.showToast('No hay usuario guardado');
    }
    return username;
  }

  async clearStorage() {
    await this.storageService.clear();
    console.log('Storage limpiado');
    await this.showToast('Almacenamiento limpiado');
  }

  // Funciones auxiliares para mostrar alertas y toasts
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }
}
