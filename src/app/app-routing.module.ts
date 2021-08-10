import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./Components/Master/login/login.component";
import {RegisterComponent} from "./Components/Master/register/register.component";
import {WildCardComponent} from "./Components/Master/wild-card/wild-card.component";
import {HomeComponent} from "./Components/Specific/home/home.component";
import {HistoryComponent} from "./Components/Specific/history/history.component";
import {AuthGuard} from "./Guards/auth.guard";
import {DoorBellComponent} from "./Components/Specific/door-bell/door-bell.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doorbell', component: DoorBellComponent },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', component: WildCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
