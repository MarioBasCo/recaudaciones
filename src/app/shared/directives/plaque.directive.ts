import { Directive, Optional, HostListener } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[plaque]',
  standalone: true
})
export class PlaqueDirective {

  constructor(@Optional() private formControlName: FormControlName) { }

  @HostListener('blur')
  onBlur(): void {
    const control = this.formControlName?.control;
    if (!control) {
      return;
    }

    const value: string = control.value;
    if (value == null) {
      return;
    }
    
    const letters = value.slice(0,3).toLocaleUpperCase();
    const numbers = value.slice(-3);
    control.patchValue(`${letters}-${numbers}`);
  }

}
