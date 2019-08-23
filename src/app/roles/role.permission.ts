import {Role} from "../models/role.model";
import {Permission} from "../models/permission.model";

export class RolePermission {
  private roleDTO: Role;
  private permissionDTO: Permission;

  constructor(roleDTO: Role, permissionDTO: Permission) {
    this.roleDTO = roleDTO;
    this.permissionDTO = permissionDTO;
  }

  get role(): Role {
    return this.roleDTO;
  }

  set role(value: Role) {
    this.roleDTO = value;
  }

  get permission(): Permission {
    return this.permissionDTO;
  }

  set permission(value: Permission) {
    this.permissionDTO = value;
  }
}
