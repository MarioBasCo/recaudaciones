import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from '../../roles/role.service';
import { UserService } from '../user.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { IUser } from '../user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm: FormGroup;
  public isLoading: boolean;
  public roles: any[] = [];
  public emailregex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public letterregex: string = "[A-Za-zÁÉÍÓÚáéíóúñÑ ]+";
  public phoneregex: string = "^0(9)[0-9\d]{8}$";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _svcRole: RoleService,
    private _svcUser: UserService,
    private toast: ToastService,
  ) {
    this.userForm = this.createForm(data);
    this.isLoading = false;
  }

  ngOnInit() {
    this._svcRole.getRoles().subscribe(resp => {
      this.roles = resp.data;
    });
  }

  createForm(user: IUser) {
    return this.fb.group({
      id: [user?.id],
      identificacion: [user?.identificacion, [Validators.required, Validators.minLength(10),
      Validators.pattern("^[0-9]*$")]],
      apellidos: [user?.apellidos, [Validators.required, Validators.pattern(this.letterregex)]],
      nombres: [user?.nombres, [Validators.required, Validators.pattern(this.letterregex)]],
      celular: [user?.celular, [Validators.required, Validators.pattern(this.phoneregex)]],
      direccion: [user?.direccion, [Validators.required]],
      name: [user?.username, [Validators.required]],
      email: [user?.email, [Validators.required, Validators.email, Validators.pattern(this.emailregex)]],
      password: [null, !user ? [Validators.required, Validators.minLength(8)] : [Validators.minLength(8)]],
      role: [user?.name_role, [Validators.required]]
    });
  }

  save() {
    const formData = this.userForm.value;
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      persona: {
        identificacion: formData.identificacion,
        apellidos: formData.apellidos,
        nombres: formData.nombres,
        celular: formData.celular,
        direccion: formData.direccion,
        correo: formData.email
      },
      role: formData.role
    };

    this.isLoading = true;
    this.userForm.disable();

    if (this.data) {
      this._svcUser.updateUser(data, this.data.id)
        .pipe(catchError((error: any) => {
          this.handleError(error);
          this.isLoading = false;
          this.userForm.enable();
          return throwError(() => error);
        }))
        .subscribe(() => {
          this.isLoading = false;
          this.userForm.enable();
          this.toast.openSnackBar('Usuario actualizado con éxito', 'success');
        });
    } else {
      this._svcUser.createUser(data)
        .pipe(catchError((error: any) => {
          this.handleError(error);
          this.isLoading = false;
          this.userForm.enable();
          return throwError(() => error);
        }))
        .subscribe(() => {
          this.isLoading = false;
          this.userForm.enable();
          this.toast.openSnackBar('Usuario creado con éxito', 'success');
        });
    }
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 422) {
      // Error de validación
      this.toast.openSnackBar(error.error.error, 'danger')
    } else if (error.status === 404) {
      // Recurso no encontrado
      this.toast.openSnackBar('El recurso no fue encontrado', 'info')
    } else if (error.status === 401) {
      // Error de validación
      const validationErrors = error.error.data;
      let msgErrors: string = '';

      if (validationErrors) {
        for (const key in validationErrors) {
          if (validationErrors.hasOwnProperty(key)) {
            msgErrors += validationErrors[key].join(', ');
          }
        }
        this.toast.openSnackBar(JSON.stringify(msgErrors), 'warning');
      }
    } else {
      // Otros errores
      console.log('Error desconocido');
    }
  }
}