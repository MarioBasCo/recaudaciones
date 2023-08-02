import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuardFn } from './shared/guards/auth.guard';
import { isLoginGuardFn } from './shared/guards/islogin.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { menuGuardFn } from './shared/guards/menu.guard';
import { defaultRouteGuardFn } from './shared/guards/default-route.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuardFn],
    children: [
      {
        path: '', 
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [defaultRouteGuardFn]
      },
      {
        path: 'maintainers', 
        loadChildren: () => import('src/app/pages/maintainers/maintainers.module').then(m => m.MaintainersModule),
        canActivate: [menuGuardFn]
      },
      {
        path: 'processes', 
        loadChildren: () => import('src/app/pages/processes/processes.module').then(m => m.ProcessesModule),
        canActivate: [menuGuardFn]
      },
      {
        path: 'rent',
        loadChildren: () => import('src/app/pages/rent/rent.module').then(m => m.RentModule),
        canActivate: [menuGuardFn]
      },
      {
        path: 'reports', 
        loadChildren: () => import('src/app/pages/reports/reports.module').then(m => m.ReportsModule),
        canActivate: [menuGuardFn]
      },
    ]
  },
  {
    path: 'auth',
    canActivate: [isLoginGuardFn],
    loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
