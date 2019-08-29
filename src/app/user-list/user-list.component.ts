import {Component, OnInit} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {User} from '../models/user.model';
import {ExcelService} from './excel.service';
//import jsPDF from 'jspdf';
import {Role} from '../models/role.model';
import {HttpErrorResponse} from '@angular/common/http';
import {RoleService} from '../service/role.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  title = 'JSON to Table Example';

  constructor(private backendService: BackendService, private excelservice: ExcelService,
              private roleService: RoleService, private toastrService: ToastrService,
              private userService: UserService) {
  }

  arrUsers: User[];
  cols: any[];
  displayDialog: boolean;
  selectedUser: User;
  newUser: boolean;

  roles: Role[];

  ngOnInit() {
    this.getAllUsers();
    this.findAllRoles();
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

  findAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
        console.log(roles);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error(error.error);
      }
    );
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
    this.selectedUser = this.cloneUser(event.data);
    this.displayDialog = true;
    console.log(this.selectedUser);
    for (let role of this.roles) {
      for (let id of this.selectedUser.roleIds)
        if (role.id === id)
          role.checked = true;
    }
  }

  cloneUser(u: User): User {
    const user = Object.assign({}, u);
    return user;
  }
  exportAsXLSX(): void {
    this.excelservice.exportAsExcelFile(this.arrUsers, 'sample');
  }
  downloadPdf() {
    //const doc = new jsPDF();

    // doc.text(this.arrUsers);
    // doc.save('a4.pdf');
  }

  onEditClick() {
    this.selectedUser.roleIds = [];

    let nameRegex = new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$");
    if (!nameRegex.test(this.selectedUser.firstName)) {
      this.toastrService.error("Invalid first name.");
      return;
    }

    if (!nameRegex.test(this.selectedUser.lastName)) {
      this.toastrService.error("Invalid last name.")
      return;
    }

    let emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@msggroup\.com$");
    if (!emailRegex.test(this.selectedUser.email)) {
      this.toastrService.error("Invalid email.")
      return;
    }

    let mobileRegex = new RegExp("^(\\+4[0][7][0-9]{8})|(\\(?\\+\\(?49\\)?[ ()]?([- ()]?\\d[- ()]?){10}){1}$");
    if (!mobileRegex.test(this.selectedUser.mobileNumber)) {
      this.toastrService.error("Invalid mobile number")
      return;
    }


    //////////////////CHECK FOR IF ONE CAN DEACTIVATE A USER/////////////////////////////

    let canDeactivate: boolean;
    this.userService.checkIfCanDeactivate(this.selectedUser).toPromise().then(response => {
        if (response.toString() === "true")
          canDeactivate = true;
        else
          canDeactivate = false;

        console.log("STATUS:" + this.selectedUser.status);
        console.log("CAN DEACTIVATE: " + canDeactivate);
        if ((!canDeactivate) && (this.selectedUser.status === true)) {
          console.log("cannot deactivate");
          this.toastrService.error("Cannot deactivate user because they have assigned bugs.");
          return;
        }

        /////////restul

      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error(error.message);
      });
////////////////////////////////////////////////////////////////////////////////////////////////


    for (let role of this.roles) {
      if (role.checked) {
        this.selectedUser.roleIds.push(role.id);
      }
    }

    this.userService.editUser(this.selectedUser).subscribe(
      () => {
        this.toastrService.success("User edited succesfully");
        this.getAllUsers();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error(error.error);
      }
    );
  }







}
