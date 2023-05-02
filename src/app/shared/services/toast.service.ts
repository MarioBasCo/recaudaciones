import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, type: string = 'success') {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: { message, type },
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'right', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["snackbar"]
    });
  }
}
