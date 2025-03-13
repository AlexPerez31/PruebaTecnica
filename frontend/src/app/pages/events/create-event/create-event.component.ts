import { Component } from '@angular/core';
import { EventFormComponent, EventFormData } from '../../shared/forms/event-form/event-form.component';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../services/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  standalone: true, 
  imports: [EventFormComponent], 
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  constructor(
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

    this.http.post(API_ENDPOINTS.EVENTS, requestData)
    .subscribe({
      next: (response) => {
        alert('¡Evento creado exitosamente!');
        this.router.navigate(['/all-events']);
      },
      error: (error) => {
        alert('Error al crear el evento. Por favor intenta de nuevo.');
        console.error('Detalles del error:', error)
      }
    });
  }
}
