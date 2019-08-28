import {BackendService} from "../core/backend/backend.service";
import {UserPermission} from "../models/userPermission.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

export class PermissionCheckerService {

  constructor(private backendService: BackendService, private toastrService: ToastrService) {
  }

  checkIfUserHasPermissionRequest(username: string, permissionType: string) {
    const userPermission = new UserPermission(username, permissionType);
    console.log(username);
    console.log(permissionType);
    return this.backendService.post("http://localhost:8080/jbugs/api/userPermission", userPermission);
  }

  checkIfUserHasPermission(username: string, requiredPermission: string): boolean {
    let response: boolean;
    this.checkIfUserHasPermissionRequest(username, requiredPermission).subscribe(
      (obj) => {
        return response = obj;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastrService.error(error.message);
      }
    );
    return response;
  }
}
