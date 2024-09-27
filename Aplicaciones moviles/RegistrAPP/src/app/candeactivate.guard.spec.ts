import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { candeactivateGuard } from './candeactivate.guard';

describe('candeactivateGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => candeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
