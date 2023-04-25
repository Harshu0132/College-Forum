import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-computer-science',
  templateUrl: './computer-science.component.html',
  styleUrls: ['./computer-science.component.scss']
})
export class ComputerScienceComponent implements OnInit {

  searchStr: String = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchUserName(){

  }

  addQuestion(){
    this.router.navigate(['/landing-page/add-question'],{
      queryParams:{
        department: "Artificial Intelligence & Data Science"
      }
    })
  }

}
