import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() filtrar = new EventEmitter<string>();
  
  applyFilter(event: any){
    let filterValue: string = event.target.value;
    this.filtrar.emit(filterValue);
  }
}
