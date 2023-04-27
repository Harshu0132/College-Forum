import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ElectronicsService } from 'src/app/services/departments/electronics.service';

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
    private domSanitizer: DomSanitizer,) {
    this.getAllQuestionDetails()
  }

  ngOnInit(): void {
  }

  searchUserName() {

  }

  comment() {
    this.router.navigate(['/landing-page/comment-room'])
  }

 

  getAllQuestionDetails() {
    let obj = {
      department: "Electronics"
    }
    this.electronicsService.getAllEleDetails(obj).subscribe(success => {
      // console.log(success);
      
      
      this.arr = success.map((s: any) => {
        console.log(s['data'].user);
        const imageurl = this.imageConverter(s['data'].attachment.data);
        const profileUrl = this.imageConverter(s['data'].user.file.data);
        return { imageUrl: imageurl,profileUrl: profileUrl, userName:s['data'].user.userName,  id: s['data'].id, subject: s['data'].subject, questionBody: s['data'].questionBody, department: s['data'].department, price: s['data'].price }
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

  addQuestion(){
    this.router.navigate(['/landing-page/add-question'],{
      queryParams:{
        department: "Electronics"
      }
    })
  }

}
