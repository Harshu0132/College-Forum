import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ElectronicsService } from 'src/app/services/departments/electronics.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.scss']
})
export class ElectronicsComponent implements OnInit {

  searchStr: String = ''
  arr: any = []
  sanitizer: any


  constructor(private router: Router,
    private electronicsService: ElectronicsService,
    private domSanitizer: DomSanitizer,
    private authenticationService: AuthenticationService
    ) {
    this.getAllQuestionDetails()
    this.getUserId()

  }

  userId: any
  getUserId() {
    this.authenticationService.getUserDetailsByToken().subscribe((success: any) => {
      this.userId = success.id
      console.log(this.userId);

      this.getAllQuestionDetails()

    })
  }

  ngOnInit(): void {
  }

  searchUserName() {

  }

  comment(id: any) {
    this.router.navigate(['/landing-page/comment-room'], {
      queryParams: {
        id: id,
        department: "Electronics"
      }
    })
  }



  getAllQuestionDetails() {
    let obj = {
      department: "Electronics"
    }
    this.electronicsService.getAllEleDetails(obj).subscribe(success => {
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
        const data = { imageUrl: imageurl, profileUrl: profileUrl, commentCounter: s['data'].commentCounter, likeCounter: s['data'].likeCounter, userName: s['data'].user.userName, id: s['data'].id, subject: s['data'].subject, questionBody: s['data'].questionBody, department: s['data'].department, isLiked: like}
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
        department: "Electronics"
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
}
