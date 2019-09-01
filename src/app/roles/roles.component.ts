import {Component, OnInit} from '@angular/core';
import {Role} from '../models/role.model';
import {Permission} from '../models/permission.model';
import {RolesService} from './roles.service';
import {RolePermission} from './role.permission';
import {CookieService} from 'ngx-cookie-service';
import {PermissionCheckerService} from "../utils/permissionCheckerService";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: Role[];
  permissions: Permission[];
  rolePermission: RolePermission;
  loggedInUser: string;
  isDisabled = false;

  constructor(private toastrService: ToastrService, private roleService: RolesService, private cookieService: CookieService, private permissionChecker: PermissionCheckerService) {
  }

  ngOnInit() {
    // get list with roles from backend
    this.roleService.getAllRoles().subscribe(obj => {
      this.roles = obj;
      console.log(this.roles.length);
    });

    // get list with permissions from backend
    this.roleService.getAllPermissions().subscribe(obj => {
      this.permissions = obj;
      console.log(this.permissions.length);
    });

    this.loggedInUser = this.cookieService.get('username');

    this.checkIfUserHasPermission();
  }

  public checkIfRoleHasPermission(perm: Permission, permissions: Permission[]) {
    const searchedPerm = permissions.find(obj => obj.type === perm.type);

    if (searchedPerm) {
      return true;
    }
    return false;
  }

  /**
   * Method for sending new checkbox changes to backend
   * @param per
   * @param role
   */
  onCheckboxClick(per: Permission, role: Role) {
    // create Wrapper with role and permission given from table
    this.rolePermission = new RolePermission(role, per);

    this.roleService.sendData(this.rolePermission).subscribe(
      () => {
        this.toastrService.success("Permission changed.")
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error("Your request could not be carried out.");
      }
    );
  }

  /**
   * Method sends a request to the backend service
   * to check whether the current user has the given permission.
   * @param requiredPermission
   */
  checkIfUserHasPermission() {
    this.permissionChecker.checkIfUserHasPermission(this.loggedInUser, 'PERMISSION_MANAGEMENT').subscribe(
      (obj) => {
        this.isDisabled = obj;
        console.log(this.isDisabled);
        console.log(this.loggedInUser);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error("Internal error.");
      }
    );
    return false;
  }


}
