import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }
  role: any
  ngOnInit(): void {
    this.authenticationService.getUserDetailsByToken().subscribe((user: any) => {
      this.role = user.role.toLowerCase()
      console.log(this.role);
      
    })
  }



}
