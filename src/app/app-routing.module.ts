import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./public/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./public/pages/sign-up/sign-up.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";


const routes: Routes = [
  { path: 'login', component : SignInComponent  },
  { path: 'register', component : SignUpComponent  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component:PageNotFoundComponent},

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
