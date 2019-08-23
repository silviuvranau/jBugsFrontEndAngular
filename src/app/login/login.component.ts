import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from "../core/backend/backend.service";
import {Login} from "../models/login.model";
import {ToasterService} from "ngx-toaster/src/lib";
import {ToastrComponentlessModule, ToastrService} from "ngx-toastr";
import {LoginService} from "../service/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCreds: Login;
  text: number;







  constructor(private router: Router, private loginService: LoginService, private toasterService: ToastrService) {


  }


  ngOnInit() {

    this.generateNumbers();
    this.back = '';


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




     this.loginService.sentToBackendUserCredentials(this.loginCreds).subscribe(
        response => {


          console.log("response is ", response);

          if (this.text.toString() !== captcha.value.toString()) {

            //alert('INVALID CAPTCHA');
            this.toasterService.error("Invalid Captcha")
            this.showMsg = true;


          }



          else if (response === null) {


            //alert('Not valid credentials')
            this.toasterService.error("Invalid Credentials")



          }

          else {

            this.toasterService.success("Login Successful");
            this.router.navigate(['/dashboard']);
          }
          //console.log('response', response);

        });


    }









}
