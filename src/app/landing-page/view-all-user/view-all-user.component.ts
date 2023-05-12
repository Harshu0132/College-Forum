import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-all-user',
  templateUrl: './view-all-user.component.html',
  styleUrls: ['./view-all-user.component.scss']
})
export class ViewAllUserComponent implements OnInit {
  data: any = []

  constructor(private userService: UserService) {
    this.getAllUserDetails()
  }

  ngOnInit(): void {
  }

  getAllUserDetails() {
    this.userService.getAllUser().subscribe((success) => {
      this.data =success
      
    })
  }

}
