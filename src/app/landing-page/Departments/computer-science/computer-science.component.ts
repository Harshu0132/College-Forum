import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CseService } from 'src/app/services/departments/cse.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuestionService } from 'src/app/services/question.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-computer-science',
  templateUrl: './computer-science.component.html',
  styleUrls: ['./computer-science.component.scss']
})
export class ComputerScienceComponent implements OnInit {

  searchStr: String = ''
  arr: any = []
  sanitizer: any


  constructor(private router: Router,
    private cseService: CseService,
    private domSanitizer: DomSanitizer,
    private authenticationService: AuthenticationService,
    private questionSer: QuestionService,
    private toastr: ToastrService,

  ) {
    this.getUserId()
  }

  ngOnInit(): void {
  }

  searchUserName() {

  }

  comment(id: any) {
    this.router.navigate(['/landing-page/comment-room'], {
      queryParams: {
        id: id,
        department: "Computer Science & Engineering"
      }
    })
  }



  getAllQuestionDetails() {
    let obj = {
      department: "Computer Science & Engineering"
    }
    this.cseService.getAllCseDetails(obj, this.userId).subscribe(success => {
      this.arr = success.map((s: any) => {

        const like = s['data'].likes.reduce((acc: any, l: any) => {
          if (l.userId === this.userId) {
            return l.like;
          }
          return acc;
        }, false);

        // console.log(like);
        const imageurl = this.imageConverter(s['data']?.attachment?.data);
        const profileUrl = this.imageConverter(s['data'].user.file?.data);
        const data = { imageUrl: imageurl, profileUrl: profileUrl, commentCounter: s['data'].commentCounter, likeCounter: s['data'].likeCounter, userName: s['data'].user.userName, id: s['data'].id, subject: s['data'].subject, questionBody: s['data'].questionBody, department: s['data'].department, isLiked: like }
        console.log(data);

        return data;
      })


    })
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

  addQuestion() {
    this.router.navigate(['/landing-page/add-question'], {
      queryParams: {
        department: "Computer Science & Engineering"
      }
    })
  }


  isLiked = false;

  onLikeClick() {
    this.isLiked = !this.isLiked;
  }

  userId: any
  role: any
  getUserId() {
    this.authenticationService.getUserDetailsByToken().subscribe((success: any) => {
      this.userId = success.id
      this.role = success.role.toLowerCase()
      console.log(this.role);

      this.getAllQuestionDetails()

    })
  }

  deleteQuestionByAdminById(id: any) {
    this.questionSer.deleteQuestionByQuestionId(id).subscribe((success: any) => {
      let msg = success.msg
      this.toastr.warning(msg + '!!', 'Delete', {
        timeOut: 2000,
      });
      this.getUserId()
    })
  }


}