import { AfterViewInit, Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA
} from "@angular/material/snack-bar";
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements AfterViewInit {
  @ViewChild('info', { static: false }) divInfo!: ElementRef;
  icon: string = '';

  constructor(
    public sbRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    switch (this.data.type) {
      case 'success':
        this.renderProperty('check', 'text-green-500', 'bg-green-100');
        break;
      case 'info':
        this.renderProperty('error_outline', 'text-blue-500', 'bg-blue-100');
        break;
      case 'warning':
        this.renderProperty('warning', 'text-orange-500', 'bg-orange-100');
        break;
      case 'danger':
        this.renderProperty('close', 'text-red-500', 'bg-red-100');
        break;
      default:
        break;
    }
  }

  renderProperty(icon: string, textColor: string, bgColor: string) {
    this.renderer.addClass(this.divInfo.nativeElement, textColor);
    this.renderer.addClass(this.divInfo.nativeElement, bgColor);
    this.icon = icon;
  }
}
