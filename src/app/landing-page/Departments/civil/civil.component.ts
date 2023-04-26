import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-civil',
  templateUrl: './civil.component.html',
  styleUrls: ['./civil.component.scss']
})
export class CivilComponent implements OnInit {

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
        department: "Civil"
      }
    })
  }
}
