import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Menu {
  id: number;
  title: string;
  url: string;
  icon: string;
  checked: boolean;
  indeterminate?: boolean;
  permissions: Permission[];
  children: Menu[];
}

export interface Permission {
  id: number;
  name: string;
  checked: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class RbacService {
  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getRoles(){
    const url = `${this.baseUrl}/roles`;
    return this.http.get<any>(url);
  }

  getRoleUser(id: number){
    const url = `${this.baseUrl}/user/role/${id}`;
    return this.http.get<any>(url);
  }

  getPermisos() {
    const url = `${this.baseUrl}/menu-opciones`
    return this.http.get<any>(url).pipe(
      map((data: any[]) => this.transformMenus(data))
    );
  }

  transformMenus(data: any[]): Menu[] {
    const assignChecked = (menu: any): any => {
      const { id, title } = menu;
      let permissions: Permission[] = [];
      //Caso de menus sin hijos pero con definición de permisos
      if (menu.permissions && menu.permissions.length > 0) {
        permissions = menu.permissions.map((permission: any) => {
          const { id, name } = permission;
          return { id, name, checked: false };
        });
      }
      
      //Caso para menus con submenus
      if (menu.children && menu.children.length > 0) {
        const childrenWithPermissions = menu.children.filter((submenu: any) => submenu.permissions && submenu.permissions.length > 0);
  
        if (childrenWithPermissions.length > 0) {
          const children = childrenWithPermissions.map((submenu: any) => {
            const { id, title } = submenu;
            let permissions: Permission[] = [];
            if (submenu.permissions && submenu.permissions.length > 0) {
              permissions = submenu.permissions.map((permission: any) => {
                const { id, name } = permission;
                return { id, name, checked: false };
              });
            }
            return { id, title, checked: false, indeterminate: false, permissions };
          });
          return { id, title, checked: false, permissions, children };
        } else {
          return { id, title, checked: false, permissions };
        }
      } else {
        return { id, title, checked: false, indeterminate: false, permissions };
      }
    };
  
    return data.map(assignChecked).filter((menu) => menu !== null) as Menu[];
  }
}
