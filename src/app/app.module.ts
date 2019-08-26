import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReadJsonComponent} from './read-json/read-json.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RolesComponent} from './roles/roles.component';
import {ButtonModule, DialogModule} from 'primeng/primeng';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/primeng';
import { UserCreateComponent } from './user-create/user-create.component';
import {UserListComponent} from './user-list/user-list.component';
import {BugsComponent} from './bugs/bugs.component';
import {BugsService} from './bugs/bugs.service';
import {RolesService} from './roles/roles.service';
import {ExcelService} from './user-list/excel.service';
import {ExcelBugsService} from './bugs/excel-bugs.service';



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
    FormsModule,
    CheckboxModule,
    TableModule,
    DialogModule
  ],
  providers: [BugsService, RolesService, ExcelService, ExcelBugsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
