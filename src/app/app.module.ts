import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReadJsonComponent} from './read-json/read-json.component';
import {HttpClientModule} from '@angular/common/http';
import {RolesComponent} from './roles/roles.component';
import {TableModule} from 'primeng/table';
import {CheckboxModule, DialogModule, InputTextModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {RolesService} from './roles/roles.service';
import {BugsComponent} from './bugs/bugs.component';
import {BugsService} from './bugs/bugs.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ReadJsonComponent,
    ReadJsonComponent,
    RolesComponent,
    BugsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    CheckboxModule,
    DialogModule,
    InputTextModule,
    BrowserAnimationsModule
  ],
  providers: [RolesService, BugsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

