import {Bug} from '../models/bug.model';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

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
    return this.backendService.put("https://localhost:8080/jbugs/api/bugs/" + id, bug);
  }
}
