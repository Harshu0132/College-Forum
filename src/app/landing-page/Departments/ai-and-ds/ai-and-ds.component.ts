import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AiAndDsService } from 'src/app/services/departments/ai-and-ds.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-ai-and-ds',
  templateUrl: './ai-and-ds.component.html',
  styleUrls: ['./ai-and-ds.component.scss']
})
export class AiAndDsComponent implements OnInit {

  searchStr: String = ''
  arr: any = []
  sanitizer: any


  constructor(private router: Router,
    private aiAndDsService: AiAndDsService,
    private domSanitizer: DomSanitizer,
    private authenticationService: AuthenticationService

  ) {
    this.getAllQuestionDetails()
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
        department: "Artificial Intelligence & Data Science"
      }
    })
  }



  getAllQuestionDetails() {
    let obj = {
      department: "Artificial Intelligence & Data Science"
    }
    this.aiAndDsService.getAllAiAndDsDetails(obj).subscribe(success => {
      // console.log(success);

      this.arr = success.map((s: any) => {

        const like = s['data'].likes.reduce((acc: any, l: any) => {
          if (l.userId === this.userId) {
            return l.like;
          }
          return acc;
        }, false);

        console.log(like);
        const imageurl = this.imageConverter(s['data']?.attachment?.data);
        const profileUrl = this.imageConverter(s['data'].user.file.data);
        const data = { imageUrl: imageurl, profileUrl: profileUrl, commentCounter: s['data'].commentCounter, likeCounter: s['data'].likeCounter, userName: s['data'].user.userName, id: s['data'].id, subject: s['data'].subject, questionBody: s['data'].questionBody, department: s['data'].department, isLiked: like }
        console.log(data);

        return data;
      })

      // console.log(this.arr);

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
        department: "Artificial Intelligence & Data Science"
      }
    })
  }

  isLiked = false;

  onLikeClick() {
    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      console.log(this.isLiked);
    }
  }

  userId: any
  getUserId() {
    this.authenticationService.getUserDetailsByToken().subscribe((success: any) => {
      this.userId = success.id
      console.log(this.userId);

      this.getAllQuestionDetails()

    })
  }

}
