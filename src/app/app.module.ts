import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReadJsonComponent} from './read-json/read-json.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { RecaptchaModule} from 'angular-google-recaptcha';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';



@NgModule({
  declarations: [
    AppComponent,
    ReadJsonComponent,
    ReadJsonComponent,
    LoginComponent,
    DashboardComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule.forRoot({
      siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI ',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
