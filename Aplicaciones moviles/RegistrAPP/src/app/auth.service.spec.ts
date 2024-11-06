import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for correct login', () => {
    expect(service.login('Nara', '1234')).toBeTrue();
  });

  it('should return false for incorrect login', () => {
    expect(service.login('wrong', 'credentials')).toBeFalse();
  });

  it('should update isAuthenticated on login and logout', () => {
    service.login('Nara', '1234');
    expect(service.isLoggedIn()).toBeTrue();
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
  });
});
