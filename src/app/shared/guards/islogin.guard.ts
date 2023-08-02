import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

export const isLoginGuardFn: CanActivateFn = () => {
    const router = inject(Router);
    const _svcAuth = inject(AuthService);

    if (_svcAuth.isAuthenticated()) {
      router.navigate(['/']);
      return false;
    } else {
      return true;
    }
}