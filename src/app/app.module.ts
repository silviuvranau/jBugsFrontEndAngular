import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReadJsonComponent} from './read-json/read-json.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {RolesComponent} from './roles/roles.component';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/primeng';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserListComponent} from './user-list/user-list.component';
import {RolesService} from "./roles/roles.service";

@NgModule({
  declarations: [
    AppComponent,
    ReadJsonComponent,
    ReadJsonComponent,
    LoginComponent,
    RolesComponent,
    DashboardComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CheckboxModule,
    TableModule
  ],
  providers: [RolesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
