import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINTS } from "../../../services/utils";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Event } from '../../shared/tables/events-table/events-table.component';
import { EventsTableComponent } from '../../shared/tables/events-table/events-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [EventsTableComponent, CommonModule, FormsModule, MatProgressSpinnerModule, MatPaginatorModule],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})

export class AllEventsComponent implements OnInit {
  events: Event[] = []
  displayedColumns: string[] = ['nombre', 'capacidad', 'estado', 'fecha', 'accion'];
  dataSource = new MatTableDataSource<Event>([]);
  isLoading = false;
  searchTerm = "";
  private searchTerms = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.searchEvents(term)),
      )
      .subscribe({
        next: (results) => {
          this.dataSource.data = results;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error en la búsqueda:', err);
          this.isLoading = false;
        }
      });
  }

  loadEvents() {
    this.isLoading = true;
    this.http.get<Event[]>(API_ENDPOINTS.EVENTS).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error fetching events:", error);
        this.isLoading = false;
      },
    });
  }

  onSearch() {
    this.isLoading = true;
    this.searchTerms.next(this.searchTerm);
  }

  private searchEvents(term: string) {
    if (!term.trim()) {
      return this.http.get<Event[]>(API_ENDPOINTS.EVENTS);
    }
    return this.http.get<{ results: Event[] }>(`${API_ENDPOINTS.EVENTS}/search?query=${term}`)
      .pipe(map(response => response.results || []));
  }

  navigateToEvent = (id: number) => {
    this.router.navigate(['/events', id]); 
  };
}