import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'; 
import { API_ENDPOINTS } from "../../../services/utils";
import { Subject } from "rxjs";
import { MatTableDataSource } from '@angular/material/table';
import { Session } from '../../shared/tables/sessions-table/sessions-table.component';
import { SessionsTableComponent } from '../../shared/tables/sessions-table/sessions-table.component';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';


interface EventDetail {
  id: number;
  name: string;
  description: string;
  capacity: number;
  status: string;
  date: string;
}

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  imports: [SessionsTableComponent, CommonModule, FormsModule, MatProgressSpinnerModule, MatPaginatorModule],
  standalone: true 
})

export class EventDetailComponent implements OnInit {
  event!: EventDetail;
  loading = true;
  error = '';

  session: Session[] = []
  displayedColumns: string[] = ['title', 'speaker', 'start_time', 'end_time', 'accion'];
  dataSource = new MatTableDataSource<Session>([]);
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  showRegisterButtonOnly: boolean = false;

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.name && user.role) {
      if (user.role === 'attendee') {
        this.showRegisterButtonOnly = true;
      }
    }

    this.loadInfo()
    this.loadSessions()
  }

  loadInfo() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const url = `${API_ENDPOINTS.EVENTS}/${id}`;
    this.http.get<EventDetail>(url).subscribe({
      next: (data) => {
        this.event = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar el evento';
        this.loading = false;
      }
    });
  }

  loadSessions() {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id')!;
    const url = `${API_ENDPOINTS.EVENTS}/${id}/sessions`;
    this.http.get<Session[]>(url).subscribe({
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

  deleteEvent(): void {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      const eventId = this.route.snapshot.paramMap.get('id')!;
      this.http.delete(`${API_ENDPOINTS.EVENTS}/${eventId}`)
        .subscribe({
          next: () => {
            alert('Evento eliminado con éxito');
            this.router.navigate(['/all-events']);
          },
          error: (err) => {
            console.error('Error eliminando evento:', err);
            alert('Error al eliminar el evento');
          }
        });
    }
  }

  registerToEvent(): void {
    const eventId = this.route.snapshot.paramMap.get('id')!;
    this.http.post(`${API_ENDPOINTS.EVENTS}/${eventId}/register`, {})
      .subscribe({
        next: () => {
          alert('¡Registro exitoso!');
          this.router.navigate(['/my-events']);
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          alert('Ya estas registrado a este evento');
        }
      });
  }

  navigateToEditEvent(): void {
    const eventId = this.route.snapshot.paramMap.get('id')!;
    this.router.navigate(['/edit-event', eventId]);
  }

  navigateToCreateSession(): void {
    const eventId = this.route.snapshot.paramMap.get('id')!;
    this.router.navigate([`/event/${eventId}/session`]);
  }

  deleteSession = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta sesión?')) {
      const eventId = this.route.snapshot.paramMap.get('id')!;
      this.http.delete(`${API_ENDPOINTS.EVENTS}/${eventId}/sessions/${id}`)
        .subscribe({
          next: () => {
            alert('sesión eliminada con éxito');
            location.reload();
          },
          error: (err) => {
            console.error('Error eliminando sesión:', err);
            alert('Error al eliminar el sesión');
          }
        });
    }
  };

  edidSession = (id: number) => {
    const eventId = this.route.snapshot.paramMap.get('id')!;
    this.router.navigate([`/event/${eventId}/session/${id}`]); 
  };

}