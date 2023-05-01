import { Directive, Renderer2, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[disallow-spaces]',
  standalone: true,
})
export class DisallowSpacesDirective {
  constructor (
    private renderer: Renderer2,
    private el: ElementRef<HTMLInputElement>
  ) {}

  @HostListener("keyup", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    let value = this.el.nativeElement.value.replace(/ /g, '');
    this.renderer.setProperty(<HTMLInputElement>event.target, 'value', value);
  }
}
