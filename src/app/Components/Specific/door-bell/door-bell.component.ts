import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OrionServiceService} from "../../../Services/orion-service.service";

@Component({
  selector: 'app-door-bell',
  templateUrl: './door-bell.component.html',
  styleUrls: ['./door-bell.component.css']
})
export class DoorBellComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  access: any;
  isChecked: boolean = false;

  constructor(private orion: OrionServiceService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.access = this.form.value
    this.orion.accesCreate().subscribe()
  }

  checkValue(event: any){
    console.log(event);
  }
}
