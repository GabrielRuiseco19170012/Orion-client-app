import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../Interfaces/user";
import Swal from "sweetalert2";
import {AuthService} from "../../../Services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @ts-ignore
  user: User;
  // @ts-ignore
  timerInterval: number;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.user = this.form.value;
    this.auth.register(this.user).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          html: 'Registrado con exito',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            this.timerInterval = setInterval(() => {
            }, 100);
          },
          willClose: () => {
            clearInterval(this.timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer');
            this.router.navigateByUrl('/login').then(() => {
            });
          }
        });
      },
      error => {
        console.error(error);
      }
    );
  }

}
