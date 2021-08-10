import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // @ts-ignore
  public status: boolean = false;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout().subscribe( data => {
    })
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(error: any): void {
    this.status = window.pageYOffset > 170;
  }
}
