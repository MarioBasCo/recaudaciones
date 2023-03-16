import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,  
    MenuComponent, 
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [NavComponent, MenuComponent],
})
export class LayoutModule { }
