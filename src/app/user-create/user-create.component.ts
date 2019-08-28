import { Component, OnInit } from '@angular/core';
import { Role } from '../models/role.model';
import { RoleService } from '../service/role.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  roles: Role[];

  constructor(private roleService: RoleService, private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.findAllRoles();
  }

  findAllRoles(){
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

  addUser(createUserForm: NgForm) {
    let userToInsert: User = {} as User;
    userToInsert.firstName = createUserForm.controls.firstName.value;
    userToInsert.lastName = createUserForm.controls.lastName.value;
    userToInsert.email = createUserForm.controls.email.value.concat("@msggroup.com");
    userToInsert.password = createUserForm.controls.password.value;
    userToInsert.mobileNumber = createUserForm.controls.mobileNumber.value;
    userToInsert.roleIds = [];
    for(let role of this.roles){
      if(role.checked){
        userToInsert.roleIds.push(role.id);
      }
    }
    console.log(userToInsert);

    this.userService.insertUser(userToInsert).subscribe(
      () => {
        this.toastrService.success("User created succesfully");
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error(error.error);
      }
    );

  }



}
