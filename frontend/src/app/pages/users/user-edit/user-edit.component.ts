import { Component } from '@angular/core';
import { UserFormComponent, UserFormData } from '../../shared/forms/user-form/user-form.component';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../services/utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: true, 
  imports: [UserFormComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})

export class UserEditComponent {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router 
  ) {}

  handleFormSubmit(data: UserFormData) {
    const requestData = {
      name: data.name, 
      role: data.role, 
      email: data.email,
    };

    const eventId = this.route.snapshot.paramMap.get('id')!;
    this.http.put(`${API_ENDPOINTS.USERS}/${eventId}`, requestData)
    .subscribe({
      next: (response) => {
        alert('¡Usuario editado exitosamente!');
        this.router.navigate(['/user']);
      },
      error: (error) => {
        alert('Error al editar el usuario. Por favor intenta de nuevo.');
        console.error('Detalles del error:', error)
      }
    });
  }

}
