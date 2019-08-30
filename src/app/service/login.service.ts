import {BackendService} from "../core/backend/backend.service";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {Login} from "../models/login.model";


export class LoginService {


  constructor(private backendService: BackendService) {
  }


  sentToBackendUserCredentials(loginCreds: Login): Observable<User> {
    return this.backendService.post('http://localhost:8080/jbugs/api/login/', loginCreds);
  }


}
