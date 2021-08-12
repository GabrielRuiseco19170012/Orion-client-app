import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";
import {User} from "../Interfaces/user";
import {TokenResponse} from "../Interfaces/token-response";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(environment.serverRoute + 'register', user);
  }

  public login(user: User): Observable<void> {
    const base = this.http.post(`${environment.serverRoute}login`, user);
    return base.pipe(
      map((data): void => {
        // @ts-ignore
        const result: TokenResponse = data;
        if (result.token) {
          this.cookieService.set('token', result.token);
        }
      })
    );
  }

  public isLoggedIn(): Observable<boolean> {
    return this.http.post<boolean>(environment.serverRoute + 'loginCheck','');
  }

  public logout(): Observable<void> {
    const base = this.http.post(`${environment.serverRoute}logout`, '');
    return base.pipe(
      map((data): void => {
        // @ts-ignore
        this.cookieService.delete('token');
        this.router.navigateByUrl('/login').then()
      })
    );
  }

  public getToken(): string{
    return this.cookieService.get('token')
  }

  public navItems(): boolean {
    return this.cookieService.check('token');
  }
}
