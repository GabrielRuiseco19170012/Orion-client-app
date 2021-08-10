import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import Swal from "sweetalert2";
import {AuthService} from "../Services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {catchError} from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private cookieService: CookieService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('token');
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloned).pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          }).then(() => {
          });
          this.auth.logout().subscribe( data => {
            console.log(data)
          })
        }
        return throwError(error);
      }));
    } else {
      return next.handle(request);
    }
  }
}
