import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { RbacService } from 'src/app/pages/maintainers/roles/rbac.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';

interface IMenu {
  id: number;
  title: string;
  url: string | null;
  icon: string;
  permissions: { id: number; name: string }[];
  children?: IMenu[];
}


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  path_base = environment.baseUrl;
  private menu: any[] = [];

  constructor(
    private http: HttpClient,
    private _svcStorage: StorageService,
    private _svcRbac: RbacService) {
    this.loadMenu();
  }

  get getAllMenus() {
    return this.getMenuPermissionsFromLocalStorage() || this.menu;
  }

  loadMenu() {
    console.log('Cargando el menu...');
    const user_pto = this._svcStorage.get('user_pto');
    if (user_pto)
      this.loadMenuPermissions().subscribe(resp => {
        this.menu.push(...resp);
      });
  }

  getMenu() {
    const user_pto = this._svcStorage.get('user_pto');
    const url = `${this.path_base}/menu/${user_pto?.role_id}`;
    return this.http.get<any>(url).pipe(
      map((data: any) => this.filterMenusByPermissions(data.menus, data.permisos))
    );
  }

  preloadMenu(role_id: number) {
    const url = `${this.path_base}/menu/${role_id}`;
    return this.http.get<any>(url).pipe(
      map((data: any) => this.filterMenusByPermissions(data.menus, data.permisos)),
      tap((filteredData: any) => {
        console.log(filteredData);
        this.saveMenuPermissionsToLocalStorage(filteredData);
      })
    );
  }

  filterMenusByPermissions(menus: IMenu[], userPermissions: string[]): IMenu[] {
    return menus.reduce<IMenu[]>((filteredMenus, menu) => {
      // Caso 1: Menú padre sin submenús, los permisos se definen en el menú padre.
      if (!menu.children || menu.children.length === 0) {
        if (menu.permissions.length > 0 && menu.permissions.some((permission) =>
          userPermissions.includes(permission.name)
        )) {
          filteredMenus.push(menu);
        }
      }
      // Caso 2: Menú padre con hijos que definen los permisos.
      else if (menu.children.length > 0 && menu.permissions.length === 0) {
        const childrenWithPermissions = this.filterMenusByPermissions(menu.children, userPermissions);
        if (childrenWithPermissions.length > 0) {
          const filteredMenu: IMenu = {
            ...menu,
            children: childrenWithPermissions,
          };
          filteredMenus.push(filteredMenu);
        }
      }
      // Caso 3: Menú padre con hijos sin permisos definidos, hereda los permisos del menú padre.
      else {
        const childrenWithPermissions = this.filterMenusByPermissions(menu.children, userPermissions);
        if ((menu.permissions.length > 0 || childrenWithPermissions.length == 0) && menu.permissions.some((permission) =>
          userPermissions.includes(permission.name)
        )) {
          filteredMenus.push(menu);
        }
      }

      return filteredMenus;
    }, []);
  }

  private saveMenuPermissionsToLocalStorage(menus: IMenu[]): void {
    localStorage.setItem('menus', JSON.stringify(menus));
  }

  private getMenuPermissionsFromLocalStorage(): IMenu[] | null {
    const storedMenus = localStorage.getItem('menus');
    return storedMenus ? JSON.parse(storedMenus) : null;
  }

  loadMenuPermissions(): Observable<IMenu[]> {
    const storedMenus = this.getMenuPermissionsFromLocalStorage();

    if (storedMenus) {
      // Si los menús están almacenados en el LocalStorage, los retornamos directamente.
      return of(storedMenus);
    } else {
      return this.getMenu().pipe(
        tap((menus) => {
          this.saveMenuPermissionsToLocalStorage(menus);
        })
      );
    }
  }

  checkUrlInMenus(menus: IMenu[], url: string): boolean {
    for (const menu of menus) {
      //console.log('Recorriendo el menu:', menu.url);
      if (menu.url === url) {
        return true;
      }

      if (menu.children && menu.children.length > 0) {
        const isFoundInChild = this.checkUrlInMenus(menu.children, url);
        if (isFoundInChild) {
          return true;
        }
      }
    }

    return false;
  }


  findDefaultRoute(item: any): string | null {
    if (item && item.url) {
      return item.url;
    } else if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        const url = this.findDefaultRoute(child);
        if (url !== null) {
          return url;
        }
      }
    }
  
    return null;
  }


  findFirstUrl(item: any): string | null {
    const url = this.findDefaultRoute(item);
    return url;
  }

}
