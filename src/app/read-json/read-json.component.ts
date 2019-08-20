import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-read-json',
  templateUrl: './read-json.component.html',
  styleUrls: ['./read-json.component.css']
})
export class ReadJsonComponent implements OnInit {

  title = 'JSON to Table Example';
  constructor(private httpService: HttpClient) { }
  arrUsers: string [];

  ngOnInit() {
    this.httpService.get('http://localhost:8080/jbugs/api/users/').subscribe(
      data => {
        this.arrUsers = data as string [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
}
