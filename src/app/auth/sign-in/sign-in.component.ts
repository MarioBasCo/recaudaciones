import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm!: FormGroup;
  showLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _svcAuth: AuthService,
    private toast: ToastService,
    private _svcStorage: StorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  signIn(): void {
    this.showLoading = true;
    const data = this.signInForm.value;
    this._svcAuth.login(data).subscribe(resp => {
      //console.log(resp);
      this.showLoading = false;

      if (resp.status == 422) {
        this.toast.openSnackBar(resp.message, 'danger')
      }

      if (resp.data) {
        const user = resp.data.usuario;
        const token = resp.data.token;
        this._svcStorage.set('token_pto', token);
        this._svcStorage.set('user_pto', user);
        this.router.navigateByUrl('/', { replaceUrl: true });
        //this.signInForm.reset();
        //this.signInForm.markAsTouched();
      }
    });
  }
}
