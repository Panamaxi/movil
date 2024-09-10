import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async login() {
    if (this.username === 'Nara' && this.password === 'duoc1234') {
      localStorage.setItem('username', this.username);
      console.log('Nombre de usuario guardado:', this.username);
      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK'],
        cssClass: 'custom-alert' // nueva clase
      });
      await alert.present();
    }
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
}
