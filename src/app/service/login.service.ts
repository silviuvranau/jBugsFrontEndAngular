import {BackendService} from "../core/backend/backend.service";
import {Observable} from "rxjs";
import {Role} from "../models/role.model";
import {User} from "../models/user.model";
import {LoginComponent} from "../login/login.component";
import {Login} from "../models/login.model";


export class LoginService{



  constructor(private backendService : BackendService ){}



  sentToBackendUserCredentials(loginCreds: Login): Observable<User>{

    return this.backendService.post('http://localhost:8080/jbugs/api/login/', loginCreds);
  }





}
