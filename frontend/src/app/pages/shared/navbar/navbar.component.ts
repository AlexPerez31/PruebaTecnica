import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent implements OnInit {  
  userName: string | null = null;
  userRole: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && user.name && user.role) {
      this.userName = user.name;
      this.userRole = this.getRoleTranslation(user.role);
    }
  }

  getRoleTranslation(role: string): string {
    const rolesMap: { [key: string]: string } = {
      attendee: "ASISTENTE",
      organizer: "ORGANIZADOR",
      admin: "ADMIN"
    };
    return rolesMap[role.toLowerCase()] || "DESCONOCIDO";
  }

  isOrganizerOrAdmin(): boolean {
    return this.userRole === "ORGANIZADOR" || this.userRole === "ADMIN";
  }

  isAdmin(): boolean {
    return this.userRole === "ADMIN";
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout() {
    console.log("Cerrando sesión...");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}