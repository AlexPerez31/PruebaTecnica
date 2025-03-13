import { Component, Input, ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.css"],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule]
})

export class UsersTableComponent implements AfterViewInit {
  @Input() displayedColumns: string[] =  ['name', 'role', 'email', 'accion'];
  @Input() onEdit!: (id: number) => void;
  @Input() onDelete!: (id: number) => void;
  @Input() set dataSource(value: MatTableDataSource<User>) {
    this._dataSource = value;
    if (this.paginator) {
      this._dataSource.paginator = this.paginator;
    }
  }

  get dataSource(): MatTableDataSource<User> {
    return this._dataSource;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _dataSource = new MatTableDataSource<User>();

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
}

export interface User {
  name: string
  email: string
  role: string
  id: number
}
