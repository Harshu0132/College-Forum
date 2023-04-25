import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { constant } from 'src/assets/constant'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.department = params.department

      this.addQuestionForm.patchValue({
        department: this.department
      })
      
    })
    
  }
  subject = constant.subject
  department: string = ''

  addQuestionForm = new FormGroup({
    subject: new FormControl(),
    department: new FormControl({ value: '', disabled: true }),
    questionBody: new FormControl(''),
  })

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.subject = params.department
    })
  }

  addQuestion() {

  }

}
