import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/auth')) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
