import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent, OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) {
  }

  open(options: OptionsAlert) {
    return this.dialog.open(AlertDialogComponent,{
      data:{
        ...options
      }
    });
  }

}
