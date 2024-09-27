import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { canmatchGuard } from './canmatch.guard';

describe('canmatchGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canmatchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
