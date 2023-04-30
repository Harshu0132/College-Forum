import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,

  ) {

  }

  ngOnInit(): void {
  }
  logout() {
    this.authenticationService.logOut()
    this.router.navigate(['/auth/login']);
    this.toastr.warning('User has been logout !!', 'Logout', {
      timeOut: 2000,
    });
  }




}

