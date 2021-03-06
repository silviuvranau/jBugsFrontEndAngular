import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule, routes} from './app-routing.module';
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
import {LoginService} from "./service/login.service";
import {RouterModule} from "@angular/router";
import {AuthGuardService} from "./guards/auth-guard.service";
import {ExcelService} from "./user-list/excel.service";
import {CommonModule, DatePipe} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {PermissionCheckerService} from "./utils/permissionCheckerService";
import {ExcelBugsService} from './bugs/excel-bugs.service';
import {NotificationListComponent} from "./notification/notification-list/notification-list.component";
import {CreateBugComponent} from './create-bug/create-bug.component';


import {HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SendNotificationsService } from './service/send-notifications.service';
import {FileSelectDirective} from "ng2-file-upload";
import {Ng2FileSizeModule} from "ng2-file-size";


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


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
    BugsComponent,
    NotificationListComponent,
    CreateBugComponent,
    FileSelectDirective
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
    DialogModule,
    RouterModule.forRoot(routes),
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
    Ng2FileSizeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [BugsService, RolesService, LoginService, PermissionCheckerService, AuthGuardService, ExcelService,
    CookieService, DatePipe, ExcelBugsService, SendNotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
