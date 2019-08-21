import {Role} from "../models/role.model";
import {Permission} from "../models/permission.model";
import {BackendService} from "../core/backend/backend.service";
import {Observable} from "rxjs";
import * as Http from "http";

export class RolesService {
  private _roles: Role[];
  private _permissions: Permission[];

  constructor(private backendService: BackendService, private http: Http) {
  }

  getAllRoles(): Observable<Role[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/roles/');
  }

  getAllPermissions(): Observable<Permission[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/permissions/');
  }


}
