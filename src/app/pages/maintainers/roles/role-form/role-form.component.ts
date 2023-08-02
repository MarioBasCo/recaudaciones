import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Menu, Permission, RbacService } from '../rbac.service';


@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent {
  public roleForm: FormGroup;
  public permissions: FormArray;
  public title: string;
  public isLoading: boolean = false;
  public menus: Menu[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RoleFormComponent>,
    private _svcRBAC: RbacService,
    private cd: ChangeDetectorRef) {
    this.permissions = new FormArray<any>([]);
    this.roleForm = this.buildForm(data);
    this.title = this.data ? 'Editar' : 'Crear';
  }

  ngOnInit(): void {
    this.getMenusWithPermisos();
  }


  getMenusWithPermisos(): void {
    this._svcRBAC.getPermisos().subscribe((data: any[]) => {
      console.log(data);
      this.menus = data;

      // Crear formControls para los permisos y agregarlos al formulario
      data.forEach((menu) => {
        const menuControl = this.fb.control(false);
        this.permissions.push(menuControl);

        if (menu.children && menu.children.length > 0) {
          menu.children.forEach((submenu: any) => {
            const submenuControl = this.fb.control(false);
            this.permissions.push(submenuControl);

            submenu.permissions.forEach((permission: any) => {
              const permissionControl = this.fb.control(false);
              this.permissions.push(permissionControl);
            });
          });
        }
      });
    });
  }

  buildForm(data: any = null): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      permissions: this.permissions
    });
  }

  onSelectPermission(menuIndex: number, permission: Permission) {
    permission.checked = !permission.checked;
    const menu = this.menus[menuIndex];
    if (!menu.children || menu.children.length === 0) {
      // Verificar si hay permisos seleccionados en el menú
      const hasSelectedPermissions = menu.permissions.some((p) => p.checked);

      // Verificar si todos los permisos están marcados
      const allPermissionsSelected = menu.permissions.every((p) => p.checked);

      // Calcular el estado indeterminado del menú
      menu.indeterminate = !allPermissionsSelected && hasSelectedPermissions;
      menu.checked = allPermissionsSelected && !menu.indeterminate;
    } else {

    }
  }

  onSelectSubmenu(menuIndex: number, submenuIndex: number) {
    const submenu = this.menus[menuIndex].children[submenuIndex];
    submenu.checked = !submenu.checked;

    for (let permission of submenu.permissions) {
      permission.checked = submenu.checked;
    }
  }

  onSelectMenu(menuIndex: number) {
    const menu = this.menus[menuIndex];
    menu.checked = !menu.checked;

    for (let permission of menu.permissions) {
      permission.checked = menu.checked;
    }

    if (!(!menu.children || menu.children.length === 0)) {
      menu.children.forEach((submenu) => {
        submenu.checked = menu.checked;

        submenu.permissions.forEach((permission) => {
          permission.checked = menu.checked;
        });
      });
    }
  }

  save() {
    this.isLoading = true;
    this.roleForm.disable();
    setTimeout(() => {
      this.isLoading = false;
      this.dialogRef.close();
    }, 500);
  }
}
