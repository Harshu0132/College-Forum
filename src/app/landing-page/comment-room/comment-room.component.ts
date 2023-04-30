import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';
import { LikesService } from 'src/app/services/likes.service';
import { ReportService } from 'src/app/services/report.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-comment-room',
  templateUrl: './comment-room.component.html',
  styleUrls: ['./comment-room.component.scss']
})
export class CommentRoomComponent implements OnInit {

  data: any
  questionId: any
  userId: any
  arr: any
  commentCounter: number = 0
  department: string = ''
  isLiked = false;

  constructor(private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private authenticationService: AuthenticationService,
    private commentsService: CommentsService,
    private likesService: LikesService,
    private reportService: ReportService,
    private toastr: ToastrService,

  ) {

  }



  commentForm = new FormGroup({
    description: new FormControl(),
    userId: new FormControl(),
  })


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.getUserId()
      this.questionId = params.id
      this.department = params.department
      this.getDetailsBYQuestionId()
      this.getAllComments()
    })

  }



  onLikeClick() {
    this.isLiked = !this.isLiked;
    let obj = {
      like: this.isLiked,
      userId: this.userId
    }
    this.questionService.likeCounter({ like: this.isLiked }, this.questionId).subscribe((success) => {
      console.log(success);
      this.getDetailsBYQuestionId()
      this.likesService.isLike(obj, this.questionId).subscribe((success) => {
        console.log(success);
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

  addComment() {
    let obj = {
      userId: this.userId
    }
    this.commentForm.patchValue(obj);

    this.commentsService.addComment(this.commentForm.value, this.questionId).subscribe((success) => {
      // console.log(success);
      if (success) {
        this.questionService.commentCounter(this.questionId).subscribe((success) => {
          this.toastr.success('Comment done !!', 'Success', {
            timeOut: 2000,
          });
        })
      }
      this.getAllComments()
      this.getDetailsBYQuestionId()
      this.getDetailsBYQuestionId()

      this.commentForm.reset()

    })
  }


  getUserId() {
    this.authenticationService.getUserDetailsByToken().subscribe((success: any) => {
      this.userId = success.id
      this.getLikeStatusByUserId()
    })
  }

  getAllComments() {
    this.commentsService.getAllCommentByQuestionId(this.questionId).subscribe((success: any) => {
      this.arr = success.map((s: any) => {
        console.log(s);

        const profileUrl = this.imageConverter(s.data.user.file.data)
        const time = this.dateToTimeConverter(s.data.createdAt)
        const date = this.dateFormatter(s.data.createdAt)
        return {
          id: s.data.id,
          userName: s.data.user.userName,
          description: s.data.description,
          profileUrl: profileUrl,
          time: time,
          date: date
        }
      })
      // console.log(this.arr);
    })
  }

  dateToTimeConverter(str: any) {
    const isoString = str;
    const date = new Date(isoString);

    const options = { timeZone: 'Asia/Kolkata' };
    const istTimeString = date.toLocaleTimeString('en-US', options);

    return istTimeString
  }

  dateFormatter(str: any) {
    const dateStr = str;
    const date = new Date(dateStr);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
  }

  getDetailsBYQuestionId() {
    this.questionService.getDetailsByQuestionId(this.questionId).subscribe((success) => {
      const profileUrl = this.imageConverter(success?.data?.user?.file?.data);
      const imageUrl = this.imageConverter(success?.data?.attachment?.data);
      if (success.data.commentCounter) {
        this.commentCounter = success.data.commentCounter
      }

      this.data = {
        id: success.data.id,
        profileUrl: profileUrl,
        imageUrl: imageUrl,
        department: success.data.department,
        questionBody: success.data.questionBody,
        subject: success.data.subject,
        userName: success.data.user.userName,
        commentCounter: success.data.commentCounter,
        likeCounter: success.data.likeCounter,
      }
    })
  }

  getLikeStatusByUserId() {
    this.likesService.getLikeStatusUserId({ userId: this.userId }, this.questionId).subscribe((data) => {
      this.isLiked = data.like;
      console.log(this.isLiked);
      // this.isLiked = data?.like
    })
  }

  addReport(userName: any) {

    this.authenticationService.getUserNameByUserId(this.userId).subscribe((success: any) => {
      let obj = {
        reportBy: success.username,
        userName: userName,
        userId: this.userId,
      }
      console.log(this.questionId);

      this.reportService.addReport(obj, this.questionId).subscribe((success) => {
        console.log(success.msg);

        if (success.msg) {
          this.toastr.success('You have successfully reported to this user !!', 'Success', {
            timeOut: 2000,
          });
        } else {
          this.toastr.warning('You have already reported to this user !!', 'Warning', {
            timeOut: 2000,
          });
        }
      })

    })



  }

}
