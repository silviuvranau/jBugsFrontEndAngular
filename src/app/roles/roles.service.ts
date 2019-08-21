import {Role} from "../models/role.model";
import {Permission} from "../models/permission.model";
import {BackendService} from "../core/backend/backend.service";
import {Observable} from "rxjs";
import {RolePermission} from "./role.permission";
import {HttpClient} from "@angular/common/http";

export class RolesService {
  private _roles: Role[];
  private _permissions: Permission[];
  public token: string;

  constructor(private backendService: BackendService, private http: HttpClient) {
  }

  getAllRoles(): Observable<Role[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/roles/');
  }

  getAllPermissions(): Observable<Permission[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/permissions/');
  }

  sendData(rolePermission: RolePermission): Observable<any> {
    /**
     // console.log(rolePermission.permissionDTO.id, rolePermission.permissionDTO.type, rolePermission.roleDTO.id, rolePermission.roleDTO.type, rolePermission.roleDTO.permissions.length);
    this.backendService.post('http://localhost:8080/jbugs/api/roles/', rolePermission).subscribe();
     // console.log(rolePermission.permissionDTO.id, rolePermission.roleDTO.id);**/
    return this.backendService.post('http://localhost:8080/jbugs/api/roles/', rolePermission);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
