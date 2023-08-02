import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-range-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill', subscriptSizing: 'dynamic' } },
  ],
  templateUrl: './range-date.component.html',
  styleUrls: ['./range-date.component.scss']
})
export class RangeDateComponent {
  @Output() startDateChange = new EventEmitter<Date>();
  @Output() endDateChange = new EventEmitter<Date>();
  public dateForm: FormGroup;
  private isDateRangeValidSubject = new Subject<boolean>();
  isDateRangeValid$ = this.isDateRangeValidSubject.asObservable();
  
  constructor() {
    this.dateForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  }

  ngOnInit() {
    this.dateForm.valueChanges.subscribe(values => {
      this.startDateChange.emit(values.startDate);
      this.endDateChange.emit(values.endDate);
    });
  }
}
