import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReadJsonComponent} from './read-json/read-json.component';
import {HttpClientModule} from '@angular/common/http';
import {RolesComponent} from './roles/roles.component';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {RolesService} from './roles/roles.service';
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadJsonComponent,
    ReadJsonComponent,
    RolesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    CheckboxModule
  ],
  providers: [RolesService],
  bootstrap: [AppComponent]
})
export class AppModule { }


