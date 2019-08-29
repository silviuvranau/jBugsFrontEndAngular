import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BackendService} from '../core/backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private backendService: BackendService) {
  }

  public getAllNotificationsForUser(username: string): Observable<Notification[]> {
    return this.backendService.get("http://localhost:8080/jbugs/api/notifications/" + username);
  }
}
