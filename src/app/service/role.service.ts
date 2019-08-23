import { Injectable } from '@angular/core';
import { BackendService } from '../core/backend/backend.service';
import { Role } from '../models/role.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private backendService: BackendService) { }

  public getAllRoles(): Observable<Role[]>{
    return this.backendService.get("http://localhost:8080/jbugs/api/roles");
  } 
}
