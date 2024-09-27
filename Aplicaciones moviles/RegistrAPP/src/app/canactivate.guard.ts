import { CanActivateFn } from '@angular/router';

export const canactivateGuard: CanActivateFn = (route, state) => {
  return true;
};
