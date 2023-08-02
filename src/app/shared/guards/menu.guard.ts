import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, NavigationEnd, NavigationStart, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { MenuService } from 'src/app/layout/menu/menu.service';

export const menuGuardFn: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const _svcMenu = inject(MenuService);
    const router = inject(Router);

    const allMenus: any[] = _svcMenu.getAllMenus ?? [];
    //console.log(allMenus);

    // Verificar si la URL está presente en el array de menús utilizando el servicio.
    const isAllowed = _svcMenu.checkUrlInMenus(allMenus, state.url);

    const defaultRoute = '/dashboard'; // Reemplaza esto con la ruta por defecto que estés usando
    const isAllowedOnDefaultRoute = _svcMenu.checkUrlInMenus(allMenus, defaultRoute);

    const panel = state.url == defaultRoute && isAllowedOnDefaultRoute && defaultRoute && isAllowed;

    //console.log('Tiene permiso al panel: ', panel);
    // Permite la navegación hacia la ruta por defecto
    

    if (isAllowed) {
        return true;
    } else {
        router.navigate(['/unauthorized']);
        return false;
    }
   
    /* if (isAllowed) {
      return true;
    } else {
      router.navigate(['/unauthorized']); 
      return false;
    } */
    

}

