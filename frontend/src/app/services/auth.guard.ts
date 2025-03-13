import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', 
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const token = this.authService.getToken();
    
    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.authService.fetchCurrentUser().pipe(
      map(user => {
        if (!user?.email) {
          this.router.navigate(['/login']);
          return false;
        }

        const requiredRoles = route.data['roles'] as string[];
        if (requiredRoles && !this.authService.hasRole(requiredRoles)) {
          this.router.navigate(['/all-events']);
          return false;
        }

        return true;
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}