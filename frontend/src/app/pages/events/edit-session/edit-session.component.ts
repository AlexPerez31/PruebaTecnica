import { Component } from '@angular/core';
import { SessionFormComponent, SessionFormData } from '../../shared/forms/session-form/session-form.component';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../services/utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-session',
  standalone: true, 
  imports: [SessionFormComponent], 
  templateUrl: './edit-session.component.html',
  styleUrl: './edit-session.component.css'
})
export class EditSessionComponent {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router 
  ) {}

  handleFormSubmit(data: SessionFormData) {
    const requestData = {
      title: data.title, 
      speaker: data.speaker, 
      start_time: new Date(data.start_time).toISOString(),
      end_time: new Date(data.end_time).toISOString()
    };

    const eventId = this.route.snapshot.paramMap.get('id')!;
    const id = this.route.snapshot.paramMap.get('id_s')!;
    this.http.put(`${API_ENDPOINTS.EVENTS}/${eventId}/sessions/${id}`, requestData)
    .subscribe({
      next: (response) => {
        alert('¡Sesion editada exitosamente!');
        this.router.navigate([`/events/${eventId}`]);
      },
      error: (error) => {
        alert('Error al editar la sesion. Por favor intenta de nuevo.');
        console.error('Detalles del error:', error)
      }
    });
  }


}
