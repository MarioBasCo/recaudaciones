import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientFormComponent } from './client-form/client-form.component';
import { MatDialog } from '@angular/material/dialog';

export interface Student {
  name: string;
  subjects: string[];
  marks: number[];
  class: string;
  section: string;
}
const ELEMENT_DATA: Student[] = [
  {
    name: 'Tony',
    subjects: ['MATH', 'PHY', 'CHEM'],
    marks: [90, 95, 97],
    class: '12',
    section: 'A',
  },
  {
    name: 'Rita',
    subjects: ['MATH', 'PHY', 'BIO'],
    marks: [97, 92, 96],
    class: '12',
    section: 'A',
  },
  {
    name: 'Monty',
    subjects: ['MATH', 'PHY', 'BIO'],
    marks: [80, 99, 100],
    class: '12',
    section: 'B',
  },
  {
    name: 'Pintu',
    subjects: ['GEOLOGY', 'HISTORY'],
    marks: [90, 95],
    class: '12',
    section: 'C',
  },
  {
    name: 'Sarah',
    subjects: ['PAINTING', 'DANCE'],
    marks: [97, 100],
    class: '12',
    section: 'C',
  },
  {
    name: 'Monty',
    subjects: ['MATH', 'PHY', 'BIO'],
    marks: [80, 99, 100],
    class: '12',
    section: 'B',
  },
  {
    name: 'Pintu',
    subjects: ['GEOLOGY', 'HISTORY'],
    marks: [90, 95],
    class: '12',
    section: 'C',
  },
  {
    name: 'Sarah',
    subjects: ['PAINTING', 'DANCE'],
    marks: [97, 100],
    class: '12',
    section: 'C',
  },
];

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  displayedColumns: string[] = [
    'name',
    'class',
    'section',
    'subjects',
    'marks',
    'actions'
  ];
  columns = [
    {
      columnDef: 'name',
      header: 'Nombre/Razón Social',
      cell: (element: Student) => `${element.name}`,
    },
    {
      columnDef: 'class',
      header: 'Identificación',
      cell: (element: Student) => `${element.class}`,
    },
    {
      columnDef: 'section',
      header: 'Section',
      cell: (element: Student) => `${element.section}`,
    },
    {
      columnDef: 'subjects',
      header: 'Subjects',
      cell: (element: Student) => `${element.subjects.join(', ')}`,
    },
    {
      columnDef: 'marks',
      header: 'Marks',
      cell: (element: Student) => `${element.marks.join(', ')}`,
    },
  ];
  dataSource!: MatTableDataSource<Student>;

  constructor(public dialog: MatDialog){}
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
  
  openDialogClient(client: any = null) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: client,
      width: '640px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      }
    });
  }

  refreshData(ev: boolean){
    if(ev) {
      alert('Refresh');
    }
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteClient(data: any) {
    alert(JSON.stringify(data));
  }
}
