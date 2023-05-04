import { Directive, HostListener } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: 'input [phone]',
  standalone: true
})
export class PhoneDirective {
  regexStr = '^[0-9]+$';

  constructor(private control: FormControlName) { }

  @HostListener("keypress", ["$event"]) onKeyPress(e: KeyboardEvent) {
    return new RegExp(this.regexStr).test(e.key);
  }

  @HostListener("paste", ["$event"]) blockPaste(e: ClipboardEvent) {
    e.preventDefault();
    const pasteData = e.clipboardData?.getData('text/plain').replace(/[^0-9]/g, '');
    this.control.control.setValue(pasteData);
  }
}
