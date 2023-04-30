import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-contract',
  templateUrl: './form-contract.component.html',
  styleUrls: ['./form-contract.component.scss']
})
export class FormContractComponent {
  public contractForm: FormGroup;
  public isLoading: boolean = false;
  public fileCurriculum!: File;
  public fileReferences!: File;
  public file!: File;
  public cv: FormControl = new FormControl();
  public referencias: FormControl = new FormControl();

  constructor(
    public fb: FormBuilder
  ){
    this.contractForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      id: [null],
      idEmpleado: [null, [Validators.required]],
      cv: [null, [Validators.required]],
      referencias: [null, [Validators.required]],
      renovacion: [false, [Validators.required]],
      mesesContrato: [null, [Validators.required]],
      fechaInicio: [null, [Validators.required]],
    })
  }


  onSelect(control: any, event: any) {
    this.file = event.addedFiles[0];
    //@ts-ignore
    this[control].setValue(this.file.name);
    this.getBase64(this.file, (data: any) => {
      const base64 = data.target.result;
      const base64Object = {
        dataObject: base64
      }
      this.contractForm?.get(control)?.setValue(base64Object);
    })
	}

  getBase64(file: File, onLoadCallback: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null) {
    let reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsDataURL(file);
 }
}
