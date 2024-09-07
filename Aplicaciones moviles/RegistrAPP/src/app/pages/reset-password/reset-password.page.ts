import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';

  constructor(private router: Router) {}

  resetPassword() {
    // Aquí iría la lógica para restablecer la contraseña
    console.log('Reset password for:', this.username);
    // Normalmente, aquí se enviaría un correo electrónico con instrucciones
    this.router.navigate(['/login']);
  }
}