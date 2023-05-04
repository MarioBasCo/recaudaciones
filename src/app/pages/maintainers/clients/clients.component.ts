import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientFormComponent } from './client-form/client-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';

export interface Student {
  name: string;
  subjects: string[];
  marks?: number[];
  class: string;
  section: Vehiculo[];
}

export interface Vehiculo {
  id?: number;
  placa: string;
  id_tipo: number;
}

const ELEMENT_DATA: Student[] = [
  {
    name: 'Tony',
    subjects: ['MATH', 'PHY', 'CHEM'],
    class: '12',
    section: [
      {
        placa: 'YBA-158',
        id_tipo: 5
      },
      {
        placa: 'YAA-788',
        id_tipo: 5
      }
    ],
  },
  {
    name: 'Rita',
    subjects: ['MATH', 'PHY', 'BIO'],
    class: '12',
    section: [
      {
        placa: 'YBA-158',
        id_tipo: 5
      }
    ],
  },
  {
    name: 'Monty',
    subjects: ['MATH', 'PHY', 'BIO'],
    class: '12',
    section: [
      {
        placa: 'YBA-158',
        id_tipo: 5
      }
    ],
  },
  {
    name: 'Pintu',
    subjects: ['GEOLOGY', 'HISTORY'],
    class: '12',
    section: [
      {
        placa: 'YBA-158',
        id_tipo: 5
      }
    ],
  },
  {
    name: 'Sarah',
    subjects: ['PAINTING', 'DANCE'],
    class: '12',
    section: [
      {
        placa: 'YBA-158',
        id_tipo: 5
      }
    ],
  },
  {
    name: 'Monty',
    subjects: ['MATH', 'PHY', 'BIO'],
    class: '12',
    section: [
      {
        placa: 'YBA-158',
        id_tipo: 5
      }
    ],
  },
  {
    name: 'Pintu',
    subjects: ['GEOLOGY', 'HISTORY'],
    class: '12',
    section: [
      {
        placa: 'YBA-158',
        id_tipo: 5
      }
    ],
  },
  {
    name: 'Sarah',
    subjects: ['PAINTING', 'DANCE'],
    class: '12',
    section: [
      {
        placa: 'YBA-158',
        id_tipo: 5
      }
    ],
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
      header: '# Vehiculos',
      cell: (element: Student) => `${element.section.length}`,
    },
  ];
  dataSource!: MatTableDataSource<Student>;

  constructor(public dialog: MatDialog, private alert: AlertService){}
  
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

  refreshData(){

  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteClient(data: any) {
    const opt: OptionsAlert = {
      title: '❌ Eliminar Registro',
      message: '¿Deseas eliminar este registro?'
    };
    const dialogAlert = this.alert.open(opt);

    dialogAlert.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        alert(JSON.stringify(data));
      }
    });
  }
}
