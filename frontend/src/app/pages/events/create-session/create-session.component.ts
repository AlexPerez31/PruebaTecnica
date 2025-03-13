import { Component } from '@angular/core';
import { SessionFormComponent, SessionFormData } from '../../shared/forms/session-form/session-form.component';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../services/utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-session',
  standalone: true, 
  imports: [SessionFormComponent], 
  templateUrl: './create-session.component.html',
  styleUrl: './create-session.component.css'
})
export class CreateSessionComponent {

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
      this.http.post(`${API_ENDPOINTS.EVENTS}/${eventId}/sessions`, requestData)
      .subscribe({
        next: (response) => {
          alert('¡Sesion creada exitosamente!');
          this.router.navigate([`/events/${eventId}`]);
        },
        error: (error) => {
          alert('Error al crear la sesion. Por favor intenta de nuevo.');
          console.error('Detalles del error:', error)
        }
      });
    }

}
