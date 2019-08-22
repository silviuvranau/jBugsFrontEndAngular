import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from "../core/backend/backend.service";
import {User} from "../models/user.model";
import {Login} from "../models/login.model";
import {generate} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCreds: Login ;
  text: number;



  constructor(private router: Router, private backendService: BackendService) {


  }


  ngOnInit() {

    this.generateNumbers();


  }


  generateNumbers(){


    this.text = Math.floor(Math.random() * (9999 - 1000)) + 1000;


    // this.text = 1345;
    console.log(this.text);

  }



  login(usernam, pass, captcha) {

      this.loginCreds = {

          username : usernam.value,
          password: pass.value
      };


      if (this.text.toString() === captcha.value.toString()) {
         console.log('da is egalee');

        this.backendService.post('http://localhost:8080/jbugs/api/users/auth', this.loginCreds).subscribe(

          response => {


            console.log("response is ",response);
            if(response === null){

              alert('INVALID CREDENTIALS');

              //console.log("E NUUUUULLLLLL", typeof response);

            }
            //console.log('response', response);

          });




      }

      else{

        alert('Not a valid captcha');
      }


    //console.log(JSON.stringify(this.loginCreds));


    //console.log(this.loginCreds);






    //console.log('Credentials are \n user name:', this.loginCreds.username, '\n', 'password:', pass.value);

    //this.router.navigate(['/dashboard']);


  }



}
