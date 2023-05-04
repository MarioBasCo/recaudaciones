import { Directive, OnInit, OnDestroy } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

@Directive({
  selector: '[appTrimtwo]',
  standalone: true
})
export class TrimtwoDirective implements OnInit, OnDestroy {
  destroy$ = new Subject <void>();
  constructor(private control: FormControlName) {}

  ngOnInit() {
    this.control.valueChanges?.pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((x) => {
        this.control.control.setValue(x.trim().replace(/ /g,''));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}