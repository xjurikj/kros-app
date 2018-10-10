import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, Injectable} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HttpErrorResponse, HttpClientModule, HttpClient, HttpHeaders} from "@angular/common/http";
import { map } from 'rxjs/operators';
import { RouterModule, Routes } from '@angular/router';
import {TableModule} from 'primeng/table';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {HTTPTestComponent} from "./http-test.component";
import { Button } from 'protractor';



@NgModule({
  declarations: [
    AppComponent,
    HTTPTestComponent
  ],

  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    TableModule,
    ContextMenuModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [ HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
