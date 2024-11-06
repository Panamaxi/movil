import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false;
  useApi: boolean = (environment as any).useApi; // Esta es la única línea que cambia// Añade esta variable en tu environment

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private toastController: ToastController,
    private storageService: StorageService,
    private apiService: ApiService
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

    if (this.useApi) {
      // Usar API
      this.apiService.login(this.username, this.password).subscribe(
        async (response) => {
          await this.handleSuccessfulLogin(response.token);
        },
        async (error) => {
          console.error('Error de login:', error);
          await this.showAlert('Error', 'Usuario o contraseña incorrectos');
        }
      );
    } else {
      // Usar login simulado
      if (this.username === 'Nara' && this.password === '12345') {
        const fakeToken = 'fake-jwt-token';
        await this.handleSuccessfulLogin(fakeToken);
      } else {
        await this.showAlert('Error', 'Usuario o contraseña incorrectos');
      }
    }
  }

  private async handleSuccessfulLogin(token: string) {
    await this.storageService.set('authToken', token);
    await this.storageService.set('username', this.username);
    this.isAuthenticated = true;
    await this.showToast('Inicio de sesión exitoso');
    this.router.navigate(['/home']);
  }

  async logout() {
    if (this.useApi) {
      this.apiService.logout().subscribe(
        async () => {
          await this.handleLogout();
        },
        async (error) => {
          console.error('Error en logout:', error);
          await this.showAlert('Error', 'Error al cerrar sesión');
        }
      );
    } else {
      await this.handleLogout();
    }
  }

  private async handleLogout() {
    await this.clearStorage();
    this.isAuthenticated = false;
    await this.showToast('Sesión cerrada exitosamente');
    this.router.navigate(['/login']);
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  loginWithFacebook() {
    if (this.useApi) {
      this.apiService.loginWithFacebook().subscribe(
        async (response) => {
          await this.handleSuccessfulLogin(response.token);
        },
        async (error) => {
          console.error('Error en login con Facebook:', error);
          await this.showAlert('Error', 'Error al iniciar sesión con Facebook');
        }
      );
    } else {
      console.log('Inicio de sesión con Facebook (simulado)');
      // Implementar simulación si es necesario
    }
  }

  loginWithGoogle() {
    if (this.useApi) {
      this.apiService.loginWithGoogle().subscribe(
        async (response) => {
          await this.handleSuccessfulLogin(response.token);
        },
        async (error) => {
          console.error('Error en login con Google:', error);
          await this.showAlert('Error', 'Error al iniciar sesión con Google');
        }
      );
    } else {
      console.log('Inicio de sesión con Google (simulado)');
      // Implementar simulación si es necesario
    }
  }

  async loginUser(email: string, password: string) {
    if (this.useApi) {
      this.apiService.login(email, password).subscribe(
        async (response) => {
          await this.storageService.set('username', email);
          await this.storageService.set('authToken', response.token);
          await this.showToast('Usuario autenticado exitosamente');
        },
        async (error) => {
          console.error('Error en loginUser:', error);
          await this.showAlert('Error', 'Error al autenticar usuario');
        }
      );
    } else {
      await this.storageService.set('username', email);
      console.log('Usuario guardado (simulado)');
      await this.showToast('Usuario guardado exitosamente');
    }
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
