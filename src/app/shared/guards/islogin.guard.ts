import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

export const isLoginGuardFn: CanActivateFn = () => {
    const router = inject(Router);
    const _svcAuth = inject(AuthService);

    if (_svcAuth.isAuthenticated()) {
      return router.parseUrl('/dashboard');
    } else {
      return true;
    }
}