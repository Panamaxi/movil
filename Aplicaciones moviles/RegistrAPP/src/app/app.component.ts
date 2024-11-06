import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(private router: Router) {
   
    this.isAuthenticated = !!localStorage.getItem('username');
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
