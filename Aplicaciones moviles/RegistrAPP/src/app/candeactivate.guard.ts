import { CanDeactivateFn } from '@angular/router';

export const candeactivateGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
