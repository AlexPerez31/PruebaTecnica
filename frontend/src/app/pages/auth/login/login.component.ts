import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent {
  email = "";
  password = "";

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const userData = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(userData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access_token);
        
        this.authService.fetchCurrentUser().subscribe({
          next: () => this.router.navigate(['/all-events']),
          error: () => alert('Error cargando datos de usuario')
        });
      },
      error: () => alert('Credenciales incorrectas')
    });
  }
}