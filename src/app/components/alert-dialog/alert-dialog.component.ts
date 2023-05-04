import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface OptionsAlert {
  title: string;
  message: string;
  buttonText?: ButtonText;
}

interface ButtonText {
  confirmButtonText?: string;
  cancelButtonText?: string;
}

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  title: string = "";
  message: string = "";
  confirmButtonText: string = "Sí";
  cancelButtonText: string = "Cancelar";

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OptionsAlert) { 

    if(data){
      this.title = data.title;
      this.message = data.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.confirmButtonText || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancelButtonText || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
