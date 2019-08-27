import {Injectable} from "@angular/core";
import {BackendService} from "../core/backend/backend.service";
import {Observable} from "rxjs";
import {Role} from "../models/role.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = JSON.parse(localStorage.getItem("loggedIn") || "false");

   loggedInGetter(): boolean {
    return JSON.parse(localStorage.getItem("loggedIn") || this.loggedIn);
  }

  loggedInSetter() {
    localStorage.setItem("loggedIn","true");
  }






  constructor() { }


}
