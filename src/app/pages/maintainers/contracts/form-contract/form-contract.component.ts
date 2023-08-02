import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { requiredFileType } from 'src/app/shared/utils/fileType';
import { ContractService } from '../contract.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'form-contract',
  templateUrl: './form-contract.component.html',
  styleUrls: ['./form-contract.component.scss']
})
export class FormContractComponent {
  public contractForm: FormGroup;
  public isLoading: boolean = false;
  public file!: File;
  public cv: FormControl = new FormControl();
  public referencias: FormControl = new FormControl();
  public users: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormContractComponent>,
    public fb: FormBuilder,
    private _svcContract: ContractService,
    private datePipe: DatePipe,
    private toast: ToastService
  ) {
    this.contractForm = this.createForm();
  }

  ngOnInit() {
    this._svcContract.getUsers().subscribe(
      res => {
        console.log(res);
        this.users = res;
      }
    )
  }

  createForm() {
    return this.fb.group({
      id: [null],
      idEmpleado: [null, [Validators.required]],
      cv: [null, [Validators.required, requiredFileType(['pdf'])]],
      referencias: [null, [Validators.required, requiredFileType(['pdf'])]],
      //renovacion: [false, [Validators.required]],
      mesesContrato: [null, [Validators.required]],
      fechaInicio: [null, [Validators.required, this.fechaActualValidator]],
    })
  }


  onSelect(control: any, event: any) {
    this.file = event.addedFiles[0];
    //@ts-ignore
    this[control].setValue(this.file.name);
  
    this.contractForm?.get(control)?.setValue(this.file);
  }

  async convertFiletoBase64(file: File) {
    const base64Result = await this.getBase64(file);
    return base64Result;
  }

  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Error al leer el archivo'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };
      reader.readAsDataURL(file);
    });
  }
  

  fechaActualValidator(control: FormControl): { [s: string]: boolean } | null {
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(control.value);

    if (fechaSeleccionada < fechaActual) {
      return { 'fechaInvalida': true };
    }

    return null;
  }

  handleBase64(result: any) {
    console.log(result.currentTarget.result);
  }

  async save() {
    const formData = this.contractForm.value;
    const cv = await this.getBase64(formData.cv);
    const referencias = await this.getBase64(formData.referencias);
    const fechaInicio = this.datePipe.transform(formData.fechaInicio, 'yyyy/MM/dd')
    const data = {
      user_id: parseInt(formData.idEmpleado),
      cv: { dataObject: cv},
      referencias: { dataObject: referencias},
      mesesContrato: parseInt(formData.mesesContrato),
      fechaInicio
    }
    console.log(data);

    this._svcContract.saveContract(data).subscribe(resp => {
      console.log(resp);
      this.dialogRef.close(true);
      this.toast.openSnackBar('Contrato Registrado con éxito');
    });
  }
}
