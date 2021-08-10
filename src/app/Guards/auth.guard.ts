import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "../Services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // @ts-ignore
  public res: boolean;

  constructor(private auth: AuthService, private router: Router) {
  }

  // @ts-ignore
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): void {
    this.auth.isLoggedIn().subscribe(data => {
      this.res = data
      if (!data){
        this.router.navigateByUrl('/home').then(r => {
          console.log('data')
          return data
        })
      }
        console.log('done2')
        return data
    })
  }
}
