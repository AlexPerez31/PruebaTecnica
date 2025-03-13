import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from './utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser;
  }

  fetchCurrentUser(): Observable<any> {
    return this.http.get<any>(API_ENDPOINTS.CURRENT_USER).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINTS.LOGIN, userData);
  }

  updateCurrentUser(userData: any): void {
    this.currentUserSubject.next(userData);
  }

  logout() {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue?.email;
  }

  hasRole(requiredRoles: string[]): boolean {
    const user = this.currentUserValue;
    return user && requiredRoles.includes(user.role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}