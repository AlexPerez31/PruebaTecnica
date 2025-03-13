import { APP_BOOTSTRAP_LISTENER, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../services/utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  name = "";
  role = "";
  email = "";
  password = "";
  confirmPassword = "";

  constructor(private http: HttpClient) {}

  register() {
    const userData = {
      name: this.name,
      role: this.role,
      email: this.email,
      password: this.password,
    };

    console.log("Registro con:", {
      name: this.name,
      role: this.role,
      email: this.email,
      password: this.password,
    });

    this.http.post(API_ENDPOINTS.REGISTER, userData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        alert('Registro con exito');
        setTimeout(() => {
          window.location.href = '/login'; 
        }, 2000);
      },
      error: (err) => {
          alert('Este email ya fué registrado');
      }
    });
  }

}