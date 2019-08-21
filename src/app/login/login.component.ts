import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from "../core/backend/backend.service";
import {User} from "../models/user.model";
import {Login} from "../models/login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCreds: Login ;




  constructor(private router: Router, private backendService: BackendService) {


  }


  ngOnInit() {

  }



  login(usernam, pass) {

      this.loginCreds = {

          username : usernam.value,
          password: pass.value
      };

      //console.log(JSON.stringify(this.loginCreds));

    console.log(this.loginCreds);


      this.backendService.post('http://localhost:8080/jbugs/api/login/', this.loginCreds).subscribe(response => console.log("response", response));



    console.log('Credentials are \n user name:', this.loginCreds.username, '\n', 'password:', pass.value);

    //this.router.navigate(['/dashboard']);


  }



}
