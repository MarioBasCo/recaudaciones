import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent {
  public roleForm: FormGroup;
  public title: string;
  public isLoading: boolean = false;

    constructor( 
      @Inject(MAT_DIALOG_DATA) public data: any, 
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<RoleFormComponent>){
      this.roleForm = this.createForm(data);
      this.title = this.data ? 'Editar' : 'Nuevo';
    }

  createForm(role: any): FormGroup {
    return this.fb.group({
      id: [role ? role.id : null],
      name: [role ? role.name : null, [Validators.required]],
      description: [role ? role.description : null, [Validators.required]]
    });
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
