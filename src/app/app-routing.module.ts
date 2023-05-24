import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuardFn } from './shared/guards/auth.guard';
import { isLoginGuardFn } from './shared/guards/islogin.guard';

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
        loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'maintainers', 
        loadChildren: () => import('src/app/pages/maintainers/maintainers.module').then(m => m.MaintainersModule)
      },
      {
        path: 'processes', 
        loadChildren: () => import('src/app/pages/processes/processes.module').then(m => m.ProcessesModule)
      },
      {
        path: 'rent',
        loadChildren: () => import('src/app/pages/rent/rent.module').then(m => m.RentModule)
      },
      {
        path: 'reports', 
        loadChildren: () => import('src/app/pages/reports/reports.module').then(m => m.ReportsModule)
      },
    ]
  },
  {
    path: 'auth',
    canActivate: [isLoginGuardFn],
    loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
