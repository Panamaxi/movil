import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  users: any[] = [];
  newUser = { username: '', password: '', email: '' };

  constructor(private router: Router, private authService: AuthService) {
    this.isAuthenticated = !!localStorage.getItem('username');
  }

  ngOnInit() {
    if (this.isAuthenticated) {
      this.loadUsers();
    }
  }

  loadUsers() {
    this.authService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  createUser() {
    this.authService.createUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = { username: '', password: '', email: '' };
    });
  }

  deleteUser(id: number) {
    this.authService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  editUser(user: any) {
    const updatedEmail = prompt('Nuevo email:', user.email);
    if (updatedEmail) {
      this.authService.updateUser(user.id, { email: updatedEmail }).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
