import { Component } from '@angular/core';
import { EventFormComponent, EventFormData } from '../../shared/forms/event-form/event-form.component';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../services/utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  standalone: true, 
  imports: [EventFormComponent],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router 
  ) {}

  handleFormSubmit(data: EventFormData) {
    const requestData = {
      name: data.name, 
      description: data.description, 
      status: data.status,
      capacity: Number(data.capacity),
      date: new Date(data.date).toISOString()
    };

    const eventId = this.route.snapshot.paramMap.get('id')!;
    this.http.put(`${API_ENDPOINTS.EVENTS}/${eventId}`, requestData)
    .subscribe({
      next: (response) => {
        alert('¡Evento editado exitosamente!');
        this.router.navigate(['/all-events']);
      },
      error: (error) => {
        alert('Error al editar el evento. Por favor intenta de nuevo.');
        console.error('Detalles del error:', error)
      }
    });
  }

}
