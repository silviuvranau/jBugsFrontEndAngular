import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from "../core/backend/backend.service";
import {Login} from "../models/login.model";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCreds: Login;
  text: number;
   htmlStr: string;

  showMsg: boolean = false;




  constructor(private router: Router, private backendService: BackendService) {


  }


  ngOnInit() {

    this.generateNumbers();


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




      this.backendService.post('http://localhost:8080/jbugs/api/login/', this.loginCreds).subscribe(
        response => {


          console.log("response is ", response);

          if (this.text.toString() !== captcha.value.toString()) {

            alert('INVALID CAPTCHA');
            this.showMsg = true;


          }



          else if (response === null) {


            alert('Not valid credentials')
            //console.log("E NUUUUULLLLLL", typeof response);



          }

          else {

            alert('Login buun');
            this.router.navigate(['/dashboard']);
          }
          //console.log('response', response);

        });


    }









}
