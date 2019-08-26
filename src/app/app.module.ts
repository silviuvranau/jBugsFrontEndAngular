import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReadJsonComponent} from './read-json/read-json.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RolesComponent} from './roles/roles.component';
import {
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  DialogModule,
  DropdownModule,
  MultiSelectModule
} from 'primeng/primeng';
import {CardModule} from 'primeng/card';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserListComponent} from './user-list/user-list.component';
import {BugsComponent} from './bugs/bugs.component';
import {BugsService} from './bugs/bugs.service';
import {RolesService} from './roles/roles.service';
import {CommonModule, DatePipe} from '@angular/common';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AuthGuardService} from "./guards/auth-guard.service";
import {LoginService} from "./service/login.service";
import {ExcelService} from "./user-list/excel.service";

@NgModule({
  declarations: [
    AppComponent,
    ReadJsonComponent,
    ReadJsonComponent,
    LoginComponent,
    DashboardComponent,
    RolesComponent,
    UserCreateComponent,
    UserListComponent,
    BugsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CheckboxModule,
    TableModule,
    DialogModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
    AngularFontAwesomeModule
  ],
  providers: [BugsService, RolesService, DatePipe, AuthGuardService, LoginService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
