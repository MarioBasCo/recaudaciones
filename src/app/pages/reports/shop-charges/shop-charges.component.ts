import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReportService } from '../report.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-shop-charges',
  templateUrl: './shop-charges.component.html',
  styleUrls: ['./shop-charges.component.scss']
})
export class ShopChargesComponent {
  public startDate!: Date;
  public endDate!: Date;
  public isLoading: boolean = false;
  public showInfo: boolean = false;
  private isDateRangeValid$ = new BehaviorSubject<boolean>(false);
  isDateRangeValidObservable: Observable<boolean> = this.isDateRangeValid$.asObservable();
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _svcReport: ReportService,
    private datePipe: DatePipe,
    private toast: ToastService) {
  }

  ngOnInit(): void {
    this.isDateRangeValidObservable.subscribe(
      (isValid: boolean) => {
        if (!isValid) {
          this.showInfo = false;
        }
      }
    );
  }
  
  get isDateRangeValid(): boolean {
    const isValid = this.startDate !== null && this.endDate !== null && this.startDate <= this.endDate;
    this.isDateRangeValid$.next(isValid);
    return isValid;
  }

  search() {
    this.isLoading = true;
    this.buscarInformacion();
  }

  buscarInformacion() {
    const startDateFormatted = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    const endDateFormatted = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    if (startDateFormatted && endDateFormatted) {
      this._svcReport.getPagos(startDateFormatted, endDateFormatted).subscribe(resp => {
        this.isLoading = false;
        if (resp.length > 0) {
          console.log(resp);
          this.showInfo = true;
          this.dataSource = new MatTableDataSource(resp);
        } else {
          this.showInfo = false;
          this.toast.openSnackBar('No se encontraron registros.', 'info');
        }
      });
    }
  }

}
