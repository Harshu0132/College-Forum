import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router,) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.authService.getUserDetailsByToken().subscribe(
        (user: any) => {
          let userRole = user.role;
          if (userRole.toLowerCase() == 'admin') {
            resolve(true);
          } else {
            this.router.navigate(['/landing-page/home'])
            resolve(false);
          }
        },
        (error: any) => {
          console.error(error);
          resolve(false);
        }
      );
    });
  }


}
