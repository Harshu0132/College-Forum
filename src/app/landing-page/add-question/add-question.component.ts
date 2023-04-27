import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { constant } from 'src/assets/constant'
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private authenticationService: AuthenticationService) {
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


  id: any 
  file: any
  profile: any;
  imageData: any;

  image: any
  chosen: any
  onSelectFile(e: any) {
    if (e.target.value) {
      this.image = e.target.files[0];
      // console.log(this.image);

      this.chosen = true
    }

    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]

    if (this.image && allowedMimeTypes.includes(this.image.type)) {
      let reader = new FileReader()
      reader.onload = () => {
        this.imageData = reader.result
        console.log(this.imageData);

      }
      reader.readAsDataURL(this.image);

      // console.log(this.image);

    }

  }



  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.subject = params.department
    })
    this.getUserId()

  }


  addQuestion() {
    let qf = new FormData()
    qf.append('subject', this.addQuestionForm.value.subject)
    qf.append('department', this.department)
    qf.append('questionBody', this.addQuestionForm.value.questionBody)



    if (this.image) {
      qf.append('file', this.image)
    } else {
      // this.toastr.error('Plz.. select image', 'Error', {
      //   timeOut: 3000,
      // });

      alert("Plzz... choose valid file")
      return
    }

    this.questionService.addQuestion(qf, this.id).subscribe((success) => {
      console.log(success);
      // this.toastr.success('Cafe details added successfully, wait for admins approvement!!', 'Success', {
      //   timeOut: 2000,
      // });
      alert("success")
      if (success) {
        alert("question posted")

        // this.router.navigate(['/landing-page/home'])
      }
    }, (err) => {
      console.log("err", err);

    })
    this.imageData = null
  }


  getUserId() {
    this.authenticationService.getUserDetailsByToken().subscribe((success: any) => {
      this.id = success.id
      console.log(this.id);
    })
  }

}
