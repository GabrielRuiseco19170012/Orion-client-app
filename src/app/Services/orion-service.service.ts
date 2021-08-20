import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class OrionServiceService {

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  public facesSet(id: any): Observable<any> {
    return this.http.post(environment.serverRoute + 'set', id);
  }

  public accesIndex(id: string): Observable<any> {
    return this.http.get(`${environment.serverRoute}mongoindex?id=${id}`);
  }

  public accesCreate(data: any): Observable<any> {
    return this.http.post(`${environment.serverRoute}genAccess`,data);
  }

  public dismiss(id: any): Observable<any> {
    return this.http.delete(`${environment.serverRoute}dissmis?id=${id}`)
  }

  public getSet(id: any): Observable<any> {
    return this.http.get(`${environment.serverRoute}showSets?id=${id}`)
  }

  public getAutoAccess(): Observable<any> {
    return this.http.get(`${environment.serverRoute}indexAccess`)
  }

  public removeAccess(id: any): Observable<any> {
    return this.http.delete(`${environment.serverRoute}removeAccess?id=${id}`)
  }

  public createFaceSet(faceSet: any): Observable<any> {
    return this.http.post(`${environment.serverRoute}storeFS`, faceSet)
  }
}
