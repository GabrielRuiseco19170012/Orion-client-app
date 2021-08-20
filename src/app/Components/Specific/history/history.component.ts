import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../Services/auth.service";
import {OrionServiceService} from "../../../Services/orion-service.service";
import {environment} from "../../../../environments/environment.prod";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required)
  });
  access: any;
  isChecked: boolean = false;
  // @ts-ignore
  elements: Array<any>;
  selectedElement: any;
  // @ts-ignore
  imgs: Array<string> = []
  id: string = "";
  // @ts-ignore
  data: accesData;
  // @ts-ignore
  sets: Array<Set>
  // @ts-ignore
  set: Set

  constructor(public orion: OrionServiceService, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.set = {
      id: 0,
      user_id: 0,
      display_name: "",
      faceset_token: "",
    }
    this.auth.getUID().subscribe(res => {
      this.id = res
      this.orion.getSet(res).subscribe(set => {
        this.sets = set
      })
      this.orion.accesIndex(res).subscribe(data => {
        this.elements = data
        for (const x of data) {
          this.imgs.push(environment.serverRoute+"serveFile?photo="+x.photo)
        }
      })
    })
  }

  dismiss(element: any): void {
    this.orion.dismiss(element._id).subscribe(data => {
      this.elements = this.elements.filter(x => x !== element)
    })
  }

  onSubmit() {
    const fid = { id: this.form.value.id}
    this.orion.facesSet(fid).subscribe(
      result => {
        console.log(result)
        const data = {
          user_id: this.id,
          name: this.form.value.name,
          access: true,
          photo: this.selectedElement.photo,
          faceset_id: this.form.value.id,
          face_token: this.selectedElement.face_token,
          faceset_token: result.faceset_token,
        }
        this.orion.accesCreate(data).subscribe( data => {
          console.log(data)
        })
      }
    )
  }

  openAcces(element: any) {
    console.log('abriendo')
    this.dismiss(element)
  }

  checkValue(event: any){
    console.log(event);
  }

  getElement(element: any) {
    this.selectedElement = element
  }
}

export interface Set {
  id: number,
  user_id: number,
  display_name: string,
  faceset_token: string,
}

export interface accesData {
  user_id: number;
  name: string;
  access: boolean;
  photo: string;
  faceset_id: string
  face_token: string
  faceset_token: string
}
