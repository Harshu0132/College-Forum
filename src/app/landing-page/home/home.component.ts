import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuestionService } from 'src/app/services/question.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchStr: String = ''
  arr: any = []
  sanitizer: any
  constructor(private domSanitizer: DomSanitizer,
    private authenticationService: AuthenticationService,
    private questionService: QuestionService) { }
  ngOnInit(): void {
    this.getAllQuestionDetails()
  }

  getAllQuestionDetails() {
    let obj = {
      department: "Computer Science & Engineering"
    }
    this.questionService.getAllQuestionDetails().subscribe(success => {
      // console.log(success);
      this.arr = success.map((s: any) => {

        const imageurl = this.imageConverter(s.attachment?.data);
        const profileUrl = this.imageConverter(s.user.file.data);
        const data = { imageUrl: imageurl, profileUrl: profileUrl, userName: s.user.userName, id: s.id, subject: s.subject, questionBody: s.questionBody, department: s.department, }
        console.log(data);

        return data;
      })


      // console.log(this.arr);

    })
  }

  searchUserName() {

  }

  imageConverter(img: any) {
    let TYPED_ARRAY = new Uint8Array(img);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '')

    let base64String = btoa(STRING_CHAR);
    const imageurl = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64, ' + base64String);
    return imageurl;
  }

}
