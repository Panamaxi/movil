import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canactivateGuard } from './canactivate.guard';

describe('canactivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
