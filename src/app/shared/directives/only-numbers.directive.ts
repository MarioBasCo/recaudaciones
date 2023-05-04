import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[onlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {

  constructor(private el: ElementRef<HTMLInputElement>) { }

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
