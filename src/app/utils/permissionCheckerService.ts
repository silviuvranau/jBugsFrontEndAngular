import {BackendService} from "../core/backend/backend.service";
import {UserPermission} from "../models/userPermission.model";

export class PermissionCheckerService {

  constructor(private backendService: BackendService) {
  }

  checkIfUserHasPermission(username: string, permissionType: string) {
    const userPermission = new UserPermission(username, permissionType);
    return this.backendService.post("http://localhost:8080/jbugs/api/userPermission", userPermission);
  }
}
