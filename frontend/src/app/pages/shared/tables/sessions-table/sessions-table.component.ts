import { Component, Input, ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sessions-table',
  templateUrl: "./sessions-table.component.html",
  styleUrls: ["./sessions-table.component.css"],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule]
})

export class SessionsTableComponent implements AfterViewInit {
  @Input() displayedColumns: string[] =  ['title', 'speaker', 'start_time', 'end_time', 'accion'];
  @Input() onEdit!: (id: number) => void;
  @Input() onDelete!: (id: number) => void;
  @Input() set dataSource(value: MatTableDataSource<Session>) {
    this._dataSource = value;
    if (this.paginator) {
      this._dataSource.paginator = this.paginator;
    }
  }

  get dataSource(): MatTableDataSource<Session> {
    return this._dataSource;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _dataSource = new MatTableDataSource<Session>();

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  hideActionsColumnMessage: boolean = false;
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.name && user.role) {
      if (user.role === 'attendee') {
        this.hideActionsColumnMessage = true;
      }
    }
  }

}

export interface Session {
  id: number;
  title: string;
  speaker: string;
  start_time: string;
  end_time: string;
}