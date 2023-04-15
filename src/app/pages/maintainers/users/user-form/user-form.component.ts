import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { 
    this.userForm = this.createForm(data);
  }


  createForm(user: any) : FormGroup {
    return this.fb.group({
      id: [user ? user.id : null],
      usuario: [user ? user.usuario : null, [Validators.required]],
      primerNombre: [user ? user.primerNombre : null, [Validators.required]],
      segundoNombre: [user ? user.segundoNombre : null, [Validators.required]],
      primerApellido: [user ? user.primerApellido : null, [Validators.required]],
      segundoApellido: [user ? user.segundoApellido : null, [Validators.required]],
      email: [user ? user.email : null, [Validators.required, Validators.email]],
      password: [user ? user.password : null, [Validators.required]],
      password_confirmation: [user ? user.password_confirmation : null, [Validators.required]],
    });
  }

  save(){
    this.isLoading = true;
    this.userForm.disable();
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
