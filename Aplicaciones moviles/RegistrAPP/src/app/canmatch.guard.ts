import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanMatchGuard implements CanMatch {
  constructor(private authService: AuthService) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    
    return this.authService.isLoggedIn();
  }
}
