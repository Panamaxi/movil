import { TestBed } from '@angular/core/testing';
import { Route, UrlSegment } from '@angular/router';
import { CanMatchGuard } from './canmatch.guard';
import { AuthService } from './services/auth.service';

describe('CanMatchGuard', () => {
  let guard: CanMatchGuard;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Crear un mock para AuthService
    const authServiceMock = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      providers: [
        CanMatchGuard,
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    guard = TestBed.inject(CanMatchGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow matching if the user is logged in', () => {
    
    authService.isLoggedIn.and.returnValue(true);

    const route: Route = { path: 'protected' };
    const segments: UrlSegment[] = [];

    const result = guard.canMatch(route, segments);

    expect(result).toBeTrue();
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('should prevent matching if the user is not logged in', () => {
    
    authService.isLoggedIn.and.returnValue(false);

    const route: Route = { path: 'protected' };
    const segments: UrlSegment[] = [];

    const result = guard.canMatch(route, segments);

    expect(result).toBeFalse();
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });
});
