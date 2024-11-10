import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";

import { SignUpComponent } from './public/pages/sign-up/sign-up.component';
import { SignInComponent } from './public/pages/sign-in/sign-in.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { FooterContentComponent } from './public/components/footer-content/footer-content.component';
import { SideNavigatorBarComponent } from './public/components/side-navigator-bar/side-navigator-bar.component';
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import { InventaryComponent } from './public/pages/model/inventary/inventary.component';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './public/pages/model/home/home.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { CollaborateComponent } from './public/pages/model/collaborate/collaborate.component';
import { ProfileComponent } from './public/pages/model/profile/profile.component';
import { DetailsComponent } from './public/pages/model/details/details.component';
@NgModule({
    declarations: [
        AppComponent,
        SignUpComponent,
        SignInComponent,
        PageNotFoundComponent,
        FooterContentComponent,
        SideNavigatorBarComponent,
        InventaryComponent,
        HomeComponent,
        CollaborateComponent,
        ProfileComponent,
        DetailsComponent,
    ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    BrowserModule,
    MatListModule,
    MatSidenavModule,
    RouterModule,
    MatGridListModule,
  ],
    providers: [],
    exports: [
        SideNavigatorBarComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
