import { CanMatchFn } from '@angular/router';

export const canmatchGuard: CanMatchFn = (route, segments) => {
  return true;
};
