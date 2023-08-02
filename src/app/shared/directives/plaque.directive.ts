import { Directive, Optional, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[plaque]',
  standalone: true
})
export class PlaqueDirective {
  private isValidationInProgress = false;

  constructor(@Optional() private formControlName: FormControlName, private renderer: Renderer2, private el: ElementRef) { }

  @HostListener('focus')
  onFocus(): void {
    this.isValidationInProgress = true;
  }

  @HostListener('blur')
  onBlur(): void {
    this.isValidationInProgress = false;
  }

  @HostListener('input')
  onInput(): void {
    let value: string = this.el.nativeElement.value;

    if (value == null) {
      return;
    }

    // Eliminar guiones y convertir minúsculas a mayúsculas
    value = value.replace(/-/g, '').toUpperCase();

    // Verificar si se deben agregar guiones y formatear la placa
    if (value.length >= 3) {
      const start = value.slice(0, 3);
      const end = value.slice(3);
      value = `${start}-${end}`;
    }

    // Verificar si hay letras después del guión y eliminarlas
    const parts = value.split('-');
    if (parts.length > 1 && /[A-Za-z]/.test(parts[1])) {
      value = parts[0] + (parts[1] ? '-' + parts[1].replace(/[A-Za-z]/g, '') : '');
    }

    this.el.nativeElement.value = value;
  }
}
