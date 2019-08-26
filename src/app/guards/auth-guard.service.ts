import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from "../service/login.service";
import {AuthService} from "../service/auth.serice";

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private loginService: LoginService, private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('val' + this.authService.loggedInGetter());
    if (this.authService.loggedInGetter() === true) {
      return true;
    }

    // navigate to login page
    this.router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
