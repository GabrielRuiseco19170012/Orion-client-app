import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "../Services/auth.service";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import {User} from "../Interfaces/user";
import {environment} from "../../environments/environment.prod";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // @ts-ignore
  public res: boolean;
  // @ts-ignore
  timeInterval: number;

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {
    const token = this.auth.getToken()

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.auth.isLoggedIn().pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        this.router.navigate(['/home']);
        return of(false);
      })
    );
  }
}
