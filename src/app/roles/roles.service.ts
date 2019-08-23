import {Role} from '../models/role.model';
import {Permission} from '../models/permission.model';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {RolePermission} from './role.permission';

export class RolesService {

  constructor(private backendService: BackendService) {
  }

  getAllRoles(): Observable<Role[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/roles/');
  }

  getAllPermissions(): Observable<Permission[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/permissions/');
  }

  sendData(rolePermission: RolePermission): Observable<any> {
    return this.backendService.post('http://localhost:8080/jbugs/api/roles/', rolePermission);
  }

}
