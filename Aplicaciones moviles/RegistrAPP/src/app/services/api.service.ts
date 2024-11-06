import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para el Post
export interface Post {
  id?: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Definir la URL base directamente para evitar el error del environment
  private apiUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

 
  loginWithFacebook(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/facebook`);
  }

 
  loginWithGoogle(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/google`);
  }

 
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

 
  createPost(newPost: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, newPost);
  }

  
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${id}`, post);
  }

  
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`);
  }

  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  
  getProtectedResource(): Observable<any> {
    return this.http.get(`${this.apiUrl}/protected-resource`, {
      headers: this.getHeaders()
    });
  }
}
