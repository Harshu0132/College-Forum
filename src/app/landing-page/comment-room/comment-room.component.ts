import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';
import { LikesService } from 'src/app/services/likes.service';

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
  constructor(private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private authenticationService: AuthenticationService,
    private commentsService: CommentsService,
    private likesService: LikesService
  ) {

  }



  commentForm = new FormGroup({
    description: new FormControl(),
    userId: new FormControl(),
  })


  ngOnInit(): void {
    this.getUserId()

    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.questionId = params.id
      this.department = params.department
      this.getDetailsBYQuestionId()
      this.getAllComments()
    })

  }


  isLiked = false;

  onLikeClick() {
    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      console.log(this.isLiked);

      let obj = {
        like: this.isLiked,
        userId: this.userId
      }
      this.questionService.likeCounter(this.questionId).subscribe((success) => {
        console.log(success);
        this.getDetailsBYQuestionId()
        this.likesService.isLike(obj, this.questionId).subscribe((success) => {
          console.log(success);
        })
      })

    } else {
      console.log(this.isLiked);

      let obj = {
        like: this.isLiked,
        userId: this.userId
      }
      this.questionService.unLikeCounter(this.questionId).subscribe((success) => {
        console.log(success);
        this.getDetailsBYQuestionId()
        this.likesService.isLike(obj, this.questionId).subscribe((success) => {
          console.log(success);
        })
      })
    }
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
          // console.log(success);
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
      this.getAllLikeStatusUserId()
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

  getAllLikeStatusUserId() {
    this.likesService.getAllLikeStatusUserId(this.userId).subscribe((data) => {
      this.isLiked = data?.like
    })
  }

  
}
