import {Bug} from '../models/bug.model';
import {BackendService} from '../core/backend/backend.service';
import {Observable} from 'rxjs';

export class BugsService {

  constructor(private backendService: BackendService) {
  }

  getAllRoles(): Observable<Bug[]> {
    return this.backendService.get('http://localhost:8080/jbugs/api/bugs/');
  }
}
