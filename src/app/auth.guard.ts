import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { elementAt, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router, private modalService: NgbModal) {
  }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true
    }
    else {
      this.router.navigate(['/auth/login'])
      return false
    }
  }


}
