import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  ];
  columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: Student) => `${element.name}`,
    },
    {
      columnDef: 'class',
      header: 'Class',
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
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
  
}
