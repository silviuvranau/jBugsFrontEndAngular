import {Component, OnInit} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {User} from '../models/user.model';
import {Bug} from '../models/bug.model';

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
  cols: any[];
  user: User;
  displayDialog: boolean;
  selectedUser: User;
  newUser: boolean;

  ngOnInit() {
    this.getAllUsers();
    // this.backendService.get('https://api.github.com/users/seeschweiler').subscribe(data => {
    //   console.log(data);
    // });
    this.cols = [
      { field: 'firstName', header: 'FirstName', width: '90px' },
      {field: 'lastName', header: 'LastName', width: '120px' },
      { field: 'email', header: 'Email', width: '270px' },
      { field: 'mobileNumber', header: 'Mobile', width: '120px'},
      { field: 'username', header: 'Username', width: '100px'},
      { field: 'status', header: 'Status', width: '100px'},
    ];

  }
  showDialogToAdd() {
    this.newUser = true;
    this.displayDialog = true;
  }

  getAllUsers() {
    this.backendService.get('http://localhost:8080/jbugs/api/users/').subscribe(
      (userList) => {
        this.arrUsers = userList;
      }
    );


  }
  onRowSelect(event) {
    this.user = this.cloneBug(event.data);
    this.displayDialog = true;
  }

  cloneBug(b: User): User {
    const bug = Object.assign({}, b);
    return bug;
  }


}
