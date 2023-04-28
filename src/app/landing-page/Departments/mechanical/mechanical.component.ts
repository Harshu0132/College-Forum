import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MechanicalService } from 'src/app/services/departments/mechanical.service';


@Component({
  selector: 'app-mechanical',
  templateUrl: './mechanical.component.html',
  styleUrls: ['./mechanical.component.scss']
})
export class MechanicalComponent implements OnInit {

  searchStr: String = ''
  arr: any = []
  sanitizer: any


  constructor(private router: Router,
    private mechanicalService: MechanicalService,
    private domSanitizer: DomSanitizer,) {
    this.getAllQuestionDetails()
  }

  ngOnInit(): void {
  }

  searchUserName() {

  }

  comment(id: any) {
    this.router.navigate(['/landing-page/comment-room'], {
      queryParams: {
        id
      }
    })
  }



  getAllQuestionDetails() {
    let obj = {
      department: "Mechanical"
    }
    this.mechanicalService.getAllMechDetails(obj).subscribe(success => {
      // console.log(success);


      this.arr = success.map((s: any) => {
        const imageurl = this.imageConverter(s['data']?.attachment?.data);
        const profileUrl = this.imageConverter(s['data'].user.file.data);
        const data = { imageUrl: imageurl, profileUrl: profileUrl, commentCounter: s['data'].commentCounter, userName: s['data'].user.userName, id: s['data'].id, subject: s['data'].subject, questionBody: s['data'].questionBody, department: s['data'].department, price: s['data'].price }
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
        department: "Mechanical"
      }
    })
  }
}
