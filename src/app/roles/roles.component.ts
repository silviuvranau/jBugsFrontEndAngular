import {Component, OnInit} from '@angular/core';
import {Role} from '../models/role.model';
import {Permission} from "../models/permission.model";
import {RolesService} from "./roles.service";
import {RolePermission} from "./role.permission";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: Role[];
  permissions: Permission[];
  rolePermission: RolePermission;

  constructor(private roleService: RolesService) {
  }

  ngOnInit() {
    this.roleService.getAllRoles().subscribe(obj => {
      this.roles = obj;
      console.log(this.roles.length);
    });

    this.roleService.getAllPermissions().subscribe(obj => {
      this.permissions = obj;
      console.log(this.permissions.length);
    });
  }

  public checkIfRoleHasPermission(perm: Permission, permissions: Permission[]) {
    const searchedPerm = permissions.find(obj => obj.type === perm.type);

    if (searchedPerm) {
      return true;
    }
    return false;
  }

  onCheckboxClick(per: Permission, role: Role) {
    const perJSON = JSON.parse(JSON.stringify(per));
    const roleJSON = JSON.parse(JSON.stringify(role));
    this.rolePermission = new RolePermission(role, per);
    const rolePermissionJson = JSON.parse(JSON.stringify(this.rolePermission));
    console.log(rolePermissionJson);

    this.roleService.sendData(this.rolePermission).subscribe((data: {}) => {
      console.log(data);
    });
  }

}
