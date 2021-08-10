import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./Services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {TokenInterceptor} from "./Interceptors/token.interceptor";
import {AuthGuard} from "./Guards/auth.guard";

//
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './Components/Master/login/login.component';
import { RegisterComponent } from './Components/Master/register/register.component';
import { NavBarComponent } from './Components/Master/nav-bar/nav-bar.component';
import { WildCardComponent } from './Components/Master/wild-card/wild-card.component';
import { FooterComponent } from './Components/Master/footer/footer.component';
import { HomeComponent } from './Components/Specific/home/home.component';
import { HistoryComponent } from './Components/Specific/history/history.component';
import { DoorBellComponent } from './Components/Specific/door-bell/door-bell.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    WildCardComponent,
    FooterComponent,
    HomeComponent,
    HistoryComponent,
    DoorBellComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
