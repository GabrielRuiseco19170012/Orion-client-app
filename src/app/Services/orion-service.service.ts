import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {User} from "../Interfaces/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class OrionServiceService {

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  public facesIndex(): Observable<any> {
    return this.http.get(environment.serverRoute + 'faces');
  }

  public accesIndex(): Observable<any> {
    return this.http.get(`${environment.serverRoute}mongoindex`);
  }

  public accesCreate(): Observable<any> {
    return this.http.post(`${environment.serverRoute}access`,"");
  }

}
