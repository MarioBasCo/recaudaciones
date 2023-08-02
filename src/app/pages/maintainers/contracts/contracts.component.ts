import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormContractComponent } from './form-contract/form-contract.component';
import { MatDialog } from '@angular/material/dialog';
import { ContractService } from './contract.service';
import { OptionsAlert } from 'src/app/components/alert-dialog/alert-dialog.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'trabajador',
    'mesesContrato',
    'fechaInicio',
    'fechaFin',
    'estado',
    'actions'
  ];
  columns = [
    {
      columnDef: 'trabajador',
      header: 'Trabajador',
      cell: (element: any) => `${element.trabajador}`,
    },
    {
      columnDef: 'mesesContrato',
      header: 'Meses Contrato',
      cell: (element: any) => `${element.mesesContrato}`,
    },
    {
      columnDef: 'fechaInicio',
      header: 'Fecha Inicio',
      cell: (element: any) => `${element.fechaInicio}`,
    },
    {
      columnDef: 'fechaFin',
      header: 'Fecha Fin',
      cell: (element: any) => `${element.fechaFin}`,
    },
    {
      columnDef: 'estado',
      header: 'Estado',
      cell: (element: any) => `${element.estado}`,
    },
  ];
  dataSource!: MatTableDataSource<any>;
  pdfSrc: string = '';

  constructor(
    public dialog: MatDialog, 
    private _svcContract: ContractService, 
    private alert: AlertService,
    private toast: ToastService){

  }

  ngOnInit(){
    this.listarContratos();
  }

  listarContratos(){
    this._svcContract.getContratos().subscribe((resp: any) => {
      this.dataSource = resp;
    });
  }

  openDialog(data: any = null) {
    const dialogRef = this.dialog.open(FormContractComponent, {
      data: data,
      width: '550px',
      minWidth: 'auto'
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.listarContratos();
      }
    });
  }

  openPdf(content: string): void {
    let info = JSON.parse(content);
    this.pdfSrc = info?.dataObject;
    
    const newWindow = window.open('', '_blank'); // Abre una nueva ventana en blanco

    const html = `
      <html>
        <head>
          <script>
            if (window.self === window.top) {
              window.addEventListener('load', function() {
                setTimeout(function() {
                  const iframe = document.createElement('iframe');
                  iframe.src = '${this.pdfSrc}';
                  iframe.style.width = '100%';
                  iframe.style.height = '100%';
                  document.body.appendChild(iframe);
                }, 100);
              });
            }
          </script>
        </head>
        <body></body>
      </html>
    `;

    newWindow?.document.open();
    newWindow?.document.write(html);
    newWindow?.document.close();
  }

  deleteElement(row: any){
    const opt: OptionsAlert = {
      title: '❌ Eliminar Registro',
      message: '¿Deseas eliminar este registro?',
      note: '! Al eliminar el registro se finzalizará el contrato !'
    };
    const dialogAlert = this.alert.open(opt);

    dialogAlert.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        let id = row.id;
        this._svcContract.eliminarContrato(id).subscribe(resp => {
          if(resp.message){
            this.toast.openSnackBar(resp.message);
            this.listarContratos();
          }
        })
      }
    });
  }
}
