import { Component, Input, ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-events-table",
  templateUrl: "./events-table.component.html",
  styleUrls: ["./events-table.component.css"],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
})

export class EventsTableComponent implements AfterViewInit {
  @Input() displayedColumns: string[] = ['nombre', 'capacidad', 'estado', 'fecha', 'accion'];
  @Input() onViewDetails!: (id: number) => void;
  @Input() set dataSource(value: MatTableDataSource<Event>) {
    this._dataSource = value;
    if (this.paginator) {
      this._dataSource.paginator = this.paginator;
    }
  }

  get dataSource(): MatTableDataSource<Event> {
    return this._dataSource;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _dataSource = new MatTableDataSource<Event>();

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

}

export interface Event {
  id: number;
  name: string;
  description: string;
  capacity: number;
  status: 'active' | 'cancelled' | 'completed';
  date: string;
}