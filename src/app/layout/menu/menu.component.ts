import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isExpanded = false;
  showSubmenu: boolean = true;
  isShowing = false;
  showSubSubMenu: boolean = false;

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

  constructor() { }

  mouseenter() {
    //console.log('enter')
    if (!this.isExpanded) {
      this.isShowing = true;
      this.isExpanded = true;
      this.showSubmenu = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
      this.isExpanded = false;
      this.showSubmenu = false;
    }
  }
}
