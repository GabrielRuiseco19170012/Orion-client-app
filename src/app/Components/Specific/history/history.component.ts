import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../Services/auth.service";
import {OrionServiceService} from "../../../Services/orion-service.service";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{

  // @ts-ignore
  elements: Array<any>
  // @ts-ignore
  imgs: Array<string> = []

  constructor(public orion: OrionServiceService) {
  }

  ngOnInit(): void {
    this.orion.facesIndex().subscribe(data => {
      this.elements = data
      for (const x of data) {
        this.imgs.push(environment.serverRoute+"serveFile?photo="+x.photo)
      }
    })
  }
}
