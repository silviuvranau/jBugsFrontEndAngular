import {Role} from "../models/role.model";
import {Permission} from "../models/permission.model";

export class RolePermission {
  private _roleDTO: Role;
  private _permissionDTO: Permission;

  constructor(roleDTO: Role, permissionDTO: Permission) {
    this._roleDTO = roleDTO;
    this._permissionDTO = permissionDTO;
  }

  get roleDTO(): Role {
    return this._roleDTO;
  }

  set roleDTO(value: Role) {
    this._roleDTO = value;
  }

  get permissionDTO(): Permission {
    return this._permissionDTO;
  }

  set permissionDTO(value: Permission) {
    this._permissionDTO = value;
  }
}
