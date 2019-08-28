import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {BackendService} from '../core/backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backendService: BackendService) { }

  public getAllUsers(): Observable<User[]>{
    return this.backendService.get("http://localhost:8080/jbugs/api/users");
  }

  public insertUser(user: User){
    return this.backendService.post("http://localhost:8080/jbugs/api/users",user);
  }

  public editUser(user: User) {
    return this.backendService.put("http://localhost:8080/jbugs/api/users", user);
  }


  public checkIfCanDeactivate(user: User) {

    console.log("tried to post");
    return this.backendService.post("http://localhost:8080/jbugs/api/bugs/canDeactivateUser", user);
  }

}
