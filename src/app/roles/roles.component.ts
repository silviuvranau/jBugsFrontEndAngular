import {Component, OnInit} from '@angular/core';
import {Role} from '../models/role.model';
import {Permission} from '../models/permission.model';
import {RolesService} from './roles.service';
import {RolePermission} from './role.permission';

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
    // get list with roles from backend
    this.roleService.getAllRoles().subscribe(obj => {
      this.roles = obj;
    });

    // get list with permissions from backend
    this.roleService.getAllPermissions().subscribe(obj => {
      this.permissions = obj;
    });
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

    this.roleService.sendData(this.rolePermission).subscribe((data: {}) => {
      console.log(data);
    });
  }

}
