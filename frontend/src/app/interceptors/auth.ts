import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token != null && !req.url.includes('/api/auth')) {
    req = req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
  }

  return next(req).pipe(
    catchError(greska => {
      if (greska.status === 401 && !req.url.includes('/api/auth')) {
        authService.odjava();
      }
      return throwError(() => greska);
    })
  );
};
