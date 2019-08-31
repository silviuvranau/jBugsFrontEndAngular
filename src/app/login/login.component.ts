import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from "../core/backend/backend.service";
import {Login} from "../models/login.model";
import {ToasterService} from "ngx-toaster/src/lib";
import {ToastrComponentlessModule, ToastrService} from "ngx-toastr";
import {LoginService} from "../service/login.service";
import {AuthService} from "../service/auth.serice";
import { CookieService } from 'ngx-cookie-service';
import {$} from "protractor";
import {FilterMetadata} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCreds: Login;
  text: number;








  constructor(private router: Router, private loginService: LoginService,
     private toasterService: ToastrService, private authService: AuthService,
     private cookieService: CookieService, private translateService: TranslateService) {


  }


  ngOnInit() {

    this.generateNumbers();
    // this.authService.loggedInSetter(false);

    localStorage.setItem("loggedIn","false");
    this.cookieService.delete("username");

  }





  generateNumbers() {


    this.text = Math.floor(Math.random() * (9999 - 1000)) + 1000;


    // this.text = 1345;
    console.log(this.text);

  }


  login(usernam, pass, captcha) {

    this.loginCreds = {

      username: usernam.value,
      password: pass.value
    };


    if (this.text.toString() !== captcha.value.toString()) {
      this.toasterService.error(this.translateService.instant('NOTIFICATION.INVALID_CAPTCHA'));
      this.generateNumbers();
      return;
    }



     this.loginService.sentToBackendUserCredentials(this.loginCreds).subscribe(
        response => {


          console.log("response is ", response);


          this.toasterService.success(this.translateService.instant('NOTIFICATION.LOGIN_SUCCESS'));
            this.router.navigate(['/dashboard']);
            this.authService.loggedInSetter();

            this.cookieService.set("username", this.loginCreds.username);
          //console.log('response', response);

        },
        (error) => {
          console.log(error);

          if(error.error === 'User not found !') {

            this.toasterService.error(this.translateService.instant('LOGIN.USERNOTFOUND'));

          }
          else if(error.error === 'Invalid credentials') {

            this.toasterService.error(this.translateService.instant('LOGIN.CREDENTIALSINVALID'));

          }
          else if(error.error === 'Account is blocked !'){

            this.toasterService.error(this.translateService.instant('LOGIN.ACCBLOCKED'));
          }
          else{
            this.toasterService.error(error.error);
          }

        });


    }









}
