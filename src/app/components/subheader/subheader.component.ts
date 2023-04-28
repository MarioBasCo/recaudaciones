import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'subheader',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent {
  @Input() title: string = '';
  @Input() options: boolean = true;
  @Output() update = new EventEmitter<boolean>();
  @Output() newElement = new EventEmitter<boolean>();

  openModal(){
    this.newElement.emit(true);
  }

  refresh(){
    this.update.emit(true);
  }
}
