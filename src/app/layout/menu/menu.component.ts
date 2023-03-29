import { Component } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  menuList: any[] = [{
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
        "text": "Cobro Garita",
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
    "text": "Report",
    "icon": "analytics",
    "routerLink": "/reports"
  }
  ];
}
