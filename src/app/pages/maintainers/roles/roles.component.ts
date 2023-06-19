import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleService } from './role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  displayedColumns = ['id', 'name', 'actions'];
  dataSource!: MatTableDataSource<any>;
  public isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _svcRole: RoleService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    this._svcRole.getRoles().subscribe(resp => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {

  }

  openDialogRole(role: any = null) {
    const dialogRef = this.dialog.open(RoleFormComponent, {
      data: role,
      minWidth: 'auto'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {

      }
    });
  }

  applyFilter(ev: any) {
    let filterValue: string = ev.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  refreshData() {

  }
}
