import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.scss']
})
export class ElectronicsComponent implements OnInit {

  searchStr: String = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchUserName(){
    
  }

  comment(){
    this.router.navigate(['/landing-page/comment-room'])
  }

  addQuestion(){
    this.router.navigate(['/landing-page/add-question'],{
      queryParams:{
        department: "Electronics"
      }
    })
  }

}
