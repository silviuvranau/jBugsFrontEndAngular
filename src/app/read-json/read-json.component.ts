import {Component, OnInit} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-read-json',
  templateUrl: './read-json.component.html',
  styleUrls: ['./read-json.component.css']
})
export class ReadJsonComponent implements OnInit {

  title = 'JSON to Table Example';
  constructor(private backendService: BackendService) { }
  arrUsers: User[];

  ngOnInit() {
    this.getAllUsers();
    // this.backendService.get('https://api.github.com/users/seeschweiler').subscribe(data => {
    //   console.log(data);
    // });

  }
  getAllUsers() {
    this.backendService.get('http://localhost:8080/jbugs/api/users/').subscribe(
      (userList) => { this.arrUsers = userList; }
    );


  }
}
