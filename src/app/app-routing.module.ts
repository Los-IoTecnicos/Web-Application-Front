import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./public/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./public/pages/sign-up/sign-up.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {InventaryComponent} from "./public/pages/model/inventary/inventary.component";
import {HomeComponent} from "./public/pages/model/home/home.component";
import {CollaborateComponent} from "./public/pages/model/collaborate/collaborate.component";
import {ProfileComponent} from "./public/pages/model/profile/profile.component";
import {DetailsComponent} from "./public/pages/model/details/details.component";


const routes: Routes = [
  { path: 'login', component : SignInComponent  },
  { path: 'register', component : SignUpComponent  },
  { path: 'home', component : HomeComponent  },
  { path: 'inventory', component : InventaryComponent  },
  { path: 'team', component : CollaborateComponent  },
  { path: 'profile', component : ProfileComponent  },
  {path:'details',component:DetailsComponent},

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component:PageNotFoundComponent},

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
