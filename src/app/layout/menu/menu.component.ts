import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
  currentRoute: string = '';
  event$ !: Subscription;
  //<mat-icon> local_convenience_store</mat-icon>
  menuList: any[] = [
    {
      "text": "Dashboard",
      "icon": "pie_chart",
      "routerLink": "/dashboard"
    },
    {
      "text": "Mantenedores",
      "icon": "dashboard",
      "children": [
        {
          "text": "Clientes",
          "icon": "fiber_manual_record",
          "routerLink": "/maintainers/clients"
        },
        {
          "text": "Usuarios",
          "icon": "fiber_manual_record",
          "routerLink": "/maintainers/users"
        },
        {
          "text": "Roles",
          "icon": "fiber_manual_record",
          "routerLink": "/maintainers/roles"
        },
        {
          "text": "Contratos",
          "icon": "fiber_manual_record",
          "routerLink": "/maintainers/contracts"
        },
        {
          "text": "Parametros",
          "icon": "fiber_manual_record",
          "routerLink": "/maintainers/params"
        }
      ]
    },
    {
      "text": "Procesos",
      "icon": "desktop_windows",
      "children": [
        {
          "text": "Cobros Garita",
          "icon": "fiber_manual_record",
          "routerLink": "/processes/turns"
        },
        {
          "text": "Cierre Turno",
          "icon": "fiber_manual_record",
          "routerLink": "/processes/close-turns"
        }
      ]
    },
    {
      "text": "Locales",
      "icon": "local_convenience_store",
      "routerLink": "/rent"
    },
    {
      "text": "Reportes",
      "icon": "analytics",
      "children": [
        {
          "text": "Cobros Garita",
          "icon": "fiber_manual_record",
          "routerLink": "/reports/charges"
        },
        {
          "text": "Historial Cobros",
          "icon": "fiber_manual_record",
          "routerLink": "/reports/record-charges"
        }
      ]
    }
  ];

  constructor(private router: Router) {

    this.event$
      = this.router.events.subscribe(evt => {
        if (evt instanceof NavigationEnd) {
          this.currentRoute = evt.url;
        }
      });
  }

  isContain(menu: any) {
    return menu?.children.filter((e: any) => e.routerLink === this.currentRoute).length > 0;
  }

  ngOnDestroy(): void {
    this.event$.unsubscribe();
  }
}
