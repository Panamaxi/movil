import { TestBed } from '@angular/core/testing';
import { CanDeactivateGuard, CanComponentDeactivate } from './candeactivate.guard';

describe('CanDeactivateGuard', () => {
  let guard: CanDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateGuard],
    });

    guard = TestBed.inject(CanDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow deactivation if the component canDeactivate returns true', () => {
    const mockComponent: CanComponentDeactivate = {
      canDeactivate: jasmine.createSpy().and.returnValue(true),
    };

    const result = guard.canDeactivate(mockComponent);

    expect(result).toBeTrue();
    expect(mockComponent.canDeactivate).toHaveBeenCalled();
  });

  it('should prevent deactivation if the component canDeactivate returns false', () => {
    const mockComponent: CanComponentDeactivate = {
      canDeactivate: jasmine.createSpy().and.returnValue(false),
    };

    const result = guard.canDeactivate(mockComponent);

    expect(result).toBeFalse();
    expect(mockComponent.canDeactivate).toHaveBeenCalled();
  });

  it('should allow deactivation if the component does not implement canDeactivate', () => {
    const mockComponent = {} as CanComponentDeactivate; // Simula un componente sin canDeactivate

    const result = guard.canDeactivate(mockComponent);

    expect(result).toBeTrue();
  });
});
