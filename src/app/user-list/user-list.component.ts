import {Component, OnInit} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  title = 'JSON to Table Example';

  constructor(private backendService: BackendService) {
  }

  arrUsers: User[];

  ngOnInit() {
    this.getAllUsers();
    // this.backendService.get('https://api.github.com/users/seeschweiler').subscribe(data => {
    //   console.log(data);
    // });

  }

  getAllUsers() {
    this.backendService.get('http://localhost:8080/jbugs/api/users/').subscribe(
      (userList) => {
        this.arrUsers = userList;
      }
    );


  }

}
