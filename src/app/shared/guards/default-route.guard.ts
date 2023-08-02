import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { MenuService } from 'src/app/layout/menu/menu.service';
import { StorageService } from '../services/storage.service';

export const defaultRouteGuardFn: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const _svcMenu = inject(MenuService);
    const storage = inject(StorageService);
    
   /*  console.log(storage.get('menus'));

    const allMenus: any[] = storage.get('menus') ?? [];
    console.log(allMenus);

    const defaultRoute = '/dashboard';
    const isAllowedOnDefaultRoute = _svcMenu.checkUrlInMenus(allMenus, defaultRoute);

    if (isAllowedOnDefaultRoute && defaultRoute == state.url) {
        return true;
    } else {
        console.log(allMenus[0]);
        let path = _svcMenu.findFirstUrl(allMenus[0]) || '';
        router.navigateByUrl(path);
        return false;
    } */

    const user = storage.get('user_pto');

    if (user.role_id == 1) {
        return true;
    } else {
        //console.log(allMenus[0]);
        //let path = _svcMenu.findFirstUrl(allMenus[0]) || '';
        router.navigateByUrl('/maintainers/clients');
        return false;
    }
}