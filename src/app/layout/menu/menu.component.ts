import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from './menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
  currentRoute: string = '';
  event$ !: Subscription;
  menuList: any[] = [];

  constructor(
    private _svcMenu: MenuService,
    private router: Router,
    private cd: ChangeDetectorRef) {

    this.event$
      = this.router.events.subscribe(evt => {
        if (evt instanceof NavigationEnd) {
          this.currentRoute = evt.url;
        }
      });
  }

  ngOnInit() {
    this.menuList = this._svcMenu.getAllMenus ?? []; 
  }

  isContain(menu: any) {
    return menu?.children.filter((e: any) => e.url === this.currentRoute).length > 0;
  }

  ngOnDestroy(): void {
    this.event$.unsubscribe();
  }
}
