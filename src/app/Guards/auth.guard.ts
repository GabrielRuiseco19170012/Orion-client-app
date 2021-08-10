import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../Services/auth.service";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import {User} from "../Interfaces/user";
import {environment} from "../../environments/environment.prod";

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
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.auth.isLoggedIn().subscribe(data => {
      this.res = data
    })
    if (!this.res){
      this.router.navigateByUrl('/').then(r => {})
    }
    return this.res
  }
}
