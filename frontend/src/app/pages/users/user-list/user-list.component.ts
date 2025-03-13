import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINTS } from "../../../services/utils";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, map } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../shared/tables/users-table/users-table.component';
import { UsersTableComponent } from '../../shared/tables/users-table/users-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UsersTableComponent, CommonModule, FormsModule, MatProgressSpinnerModule, MatPaginatorModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent implements OnInit {

  user: User[] = []
  displayedColumns: string[] = ['name', 'role', 'email','accion'];
  dataSource = new MatTableDataSource<User>([]);
  isLoading = false;
  searchTerm = "";
  private searchTerms = new Subject<string>();

    constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
      private router: Router
    ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    this.http.get<User[]>(API_ENDPOINTS.USERS).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error fetching user:", error);
        this.isLoading = false;
      },
    });
  }

  deleteUser = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      const eventId = this.route.snapshot.paramMap.get('id')!;
      this.http.delete(`${API_ENDPOINTS.USERS}/${id}`)
        .subscribe({
          next: () => {
            alert('Usuario eliminado con éxito');
            this.router.navigate(['/users']);
          },
          error: (err) => {
            console.error('Error eliminando usuario:', err);
            alert('Error al eliminar el usuario');
          }
        });
    }
  }

  editUser = (id: number) => {
    const eventId = this.route.snapshot.paramMap.get('id')!;
    this.router.navigate([`users/edit/${id}`]); 
  };

}
