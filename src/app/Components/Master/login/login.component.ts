import { Component, OnInit } from '@angular/core';
import {User} from "../../../Interfaces/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../Services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  message: string = null;
  // @ts-ignore
  user: User
  // @ts-ignore
  timeInterval: number;
  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  constructor(private auth: AuthService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.user = this.form.value;
    this.auth.login(this.user).subscribe(
      // @ts-ignore
      data => {
        if (this.cookieService.check('token')){
          Swal.fire(
            {
              icon: 'success',
              title: 'Ingresando',
              html: 'Usuario autentificado',
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                this.timeInterval = setInterval(() => {
                }, 100);
              },
              willClose: () => {
                clearInterval(this.timeInterval);
              }
            }
          ).then((result)=>{
            if (result.dismiss === Swal.DismissReason.timer){
              this.router.navigateByUrl('/home').then(()=>{});
            }
          });
        } else {
          return {message: 'user not found'}
        }
      },
      error => {
        Swal.fire(
          {
            icon: 'error',
            title: 'Invalido',
            html: 'Usuario no autentificado',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              this.timeInterval = setInterval(() => {
              }, 100);
            },
            willClose: () => {
              clearInterval(this.timeInterval);
            }
          }
        ).then((result)=>{
          if (result.dismiss === Swal.DismissReason.timer){
            this.router.navigateByUrl('/login').then(()=>{});
          }
        });
        if (error.status === 400 || error.status ===401) {
        }
      }
    );
  }
}
