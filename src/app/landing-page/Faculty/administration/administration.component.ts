import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  constructor(private userService: UserService,
    private domSanitizer: DomSanitizer,
  ) { }
  data: any
  ngOnInit(): void {
    let obj = {
      designation: 'Administration'
    }
    this.userService.getDetailsByDesignation(obj).subscribe((success) => {
      this.data = success.map((s: any) => {
        const profileUrl = this.imageConverter(s.file?.data)
        return { profileUrl: profileUrl, firstName: s.firstName, designation: s.designation }
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

}
