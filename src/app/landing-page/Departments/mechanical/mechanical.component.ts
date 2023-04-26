import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mechanical',
  templateUrl: './mechanical.component.html',
  styleUrls: ['./mechanical.component.scss']
})
export class MechanicalComponent implements OnInit {

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
        department: "Mechanical"
      }
    })
  }
}
