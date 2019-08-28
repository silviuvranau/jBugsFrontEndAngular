import {Bug} from '../models/bug.model';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {UserPermission} from "../models/userPermission.model";

export class BugsService {

  constructor(private backendService: BackendService) {
  }


  getAllBugs(): Observable<Bug[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/bugs/');
  }

  getAllUsers(): Observable<User[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/users/');
  }

  editBug(id: number, bug: Bug) {
    return this.backendService.put("http://localhost:8080/jbugs/api/bugs", bug);
  }

  checkIfUserHasPermission(username: string, permissionType: string) {
    const userPermission = new UserPermission(username, permissionType);
    console.log(username);
    console.log(permissionType);
    return this.backendService.post("http://localhost:8080/jbugs/api/userPermission", userPermission);
  }
}
