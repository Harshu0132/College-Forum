import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ai-and-ds',
  templateUrl: './ai-and-ds.component.html',
  styleUrls: ['./ai-and-ds.component.scss']
})
export class AiAndDsComponent implements OnInit {

  searchStr: String = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchUserName() {

  }

  comment() {
    this.router.navigate(['/landing-page/comment-room'])
  }

  addQuestion() {
    this.router.navigate(['/landing-page/add-question'], {
      queryParams: {
        department: "Computer Science & Engineering"
      }
    })
  }

}
