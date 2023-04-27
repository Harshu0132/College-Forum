import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';

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

  constructor(private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private authenticationService: AuthenticationService,
    private commentsService: CommentsService
  ) {


  }



  commentForm = new FormGroup({
    description: new FormControl(),
    userId: new FormControl(),
  })


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.questionId = params.id
      this.questionService.getDetailsByQuestionId(this.questionId).subscribe((success) => {
        const profileUrl = this.imageConverter(success?.data?.user?.file?.data);
        const imageUrl = this.imageConverter(success?.data?.attachment?.data);


        this.data = {
          id: success.data.id,
          profileUrl: profileUrl,
          imageUrl: imageUrl,
          department: success.data.department,
          questionBody: success.data.questionBody,
          subject: success.data.subject,
          userName: success.data.user.userName
        }
        console.log(this.data);
      })
      this.getUserId()
      this.getAllComments()

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
      console.log(success);
      if (success) {
        // alert("comment add successfully")
      }
      this.getAllComments()
    })



  }


  getUserId() {
    this.authenticationService.getUserDetailsByToken().subscribe((success: any) => {
      this.userId = success.id
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

      console.log(this.arr);


    })
  }

  dateToTimeConverter(str: any) {
    const isoString = str;
    const date = new Date(isoString);

    const options = { timeZone: 'Asia/Kolkata' };
    const istTimeString = date.toLocaleTimeString('en-US', options);

    return istTimeString
  }

  dateFormatter(str: any){
    const dateStr = str;
    const date = new Date(dateStr);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
    
    
  }
 
}
