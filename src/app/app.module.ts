import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./login.service";
import {ConsoleService} from "./console.service";
import {HttpClientModule} from "@angular/common/http";
import {EstaffFlowbackService} from "./estaff-flowback.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    LoginService,
    ConsoleService,
    EstaffFlowbackService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
