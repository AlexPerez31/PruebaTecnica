import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINTS } from '../../../services/utils';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Event } from '../../shared/tables/events-table/events-table.component';
import { EventsTableComponent } from '../../shared/tables/events-table/events-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-my-events',
  imports: [EventsTableComponent, CommonModule, FormsModule, MatProgressSpinnerModule, MatPaginatorModule],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css'
})

export class MyEventsComponent implements OnInit {
  events: Event[] = []
  displayedColumns: string[] = ['nombre', 'capacidad', 'estado', 'fecha', 'accion'];
  dataSource = new MatTableDataSource<Event>([]);
  isLoading = false;
  searchTerm = "";
  private searchTerms = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    this.http.get<Event[]>(API_ENDPOINTS.MYEVENTS).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error:", error);
        this.isLoading = false;
      },
    });
  }

  onSearch() {
    this.isLoading = true;
    this.searchTerms.next(this.searchTerm);
  }

  navigateToEvent = (id: number) => {
    this.router.navigate(['/events', id]); 
  };
}
