import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OrionServiceService} from "../../../Services/orion-service.service";
import {environment} from "../../../../environments/environment.prod";
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-door-bell',
  templateUrl: './door-bell.component.html',
  styleUrls: ['./door-bell.component.css']
})
export class DoorBellComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  // @ts-ignore
  elements: Array<any>;
  imgs: Array<string> = []
  access: any;
  isChecked: boolean = false;

  constructor(private orion: OrionServiceService, private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.orion.getAutoAccess().subscribe(data => {
      this.elements = data
      console.log(this.elements)
      for (const x of data) {
        this.imgs.push(environment.serverRoute+"serveFile?photo="+x.photo)
      }
    })
  }

  dismiss(element: any): void {
    this.orion.removeAccess(element.id).subscribe(data => {
      this.elements = this.elements.filter(x => x !== element)
      console.log(data)
    })
  }

  onSubmit() {
    this.auth.getUID().subscribe(data => {
      const name = this.form.value
      const faceSet = {
        user_id: data,
        display_name: name.name
      }
      this.orion.createFaceSet(faceSet).subscribe(res => {
        console.log(res)
      })
    })
  }
}
