import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = JSON.parse(localStorage.getItem("loggedIn") || "false");

  loggedInGetter(): boolean {
    return JSON.parse(localStorage.getItem("loggedIn") || this.loggedIn);
  }

  loggedInSetter() {
    localStorage.setItem("loggedIn", "true");
  }


  constructor() {
  }


}
