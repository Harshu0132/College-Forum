import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ElectronicsService } from 'src/app/services/departments/electronics.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/question.service';

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
    private authenticationService: AuthenticationService,
    private questionSer: QuestionService,
    private toastr: ToastrService,
    ) {
    this.getAllQuestionDetails()
    this.getUserId()

  }

  userId: any
  getUserId() {
    this.authenticationService.getUserDetailsByToken().subscribe((success: any) => {
      this.userId = success.id
      this.role = success.role.toLowerCase()
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
        const profileUrl = this.imageConverter(s['data'].user.file?.data);
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

  role: any
  deleteQuestionByAdminById(id: any) {
    this.questionSer.deleteQuestionByQuestionId(id).subscribe((success: any) => {
      let msg = success.msg
      this.toastr.warning(msg + '!!', 'Delete', {
        timeOut: 2000,
      });
      this.getUserId()
    })
  }

  // Share on WhatsApp
  shareOnWhatsApp(question: any) {
    const text = `${this.text}`;
    console.log(this.text);

    const url = ''; // Set the URL you want to share
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    window.open(whatsappUrl, '_blank');
  }

  // Share on Telegram
  shareOnTelegram(question: any) {
    const text = `${this.text}`;
    const url = ''; // Set the URL you want to share
    const telegramUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    window.open(telegramUrl, '_blank');
  }

  shareOnTwitter(question: any) {
    const text = encodeURIComponent(`${this.text}`);
    const hashtags = ''; // Add your desired hashtags
    const imageUrl = encodeURIComponent(question.imageUrl); // Encode the image URL
    console.log(imageUrl);

    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}&url=&media=${imageUrl}`;
    window.open(twitterUrl, '_blank');
  }
  text: any

  addQuestionToBody(question: any) {
    this.text = question.questionBody
  }
}
