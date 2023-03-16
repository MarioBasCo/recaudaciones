import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ParamsComponent } from './params/params.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'clients',
  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'contracts',
    component: ContractsComponent
  },
  {
    path: 'params',
    component: ParamsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainersRoutingModule { }
