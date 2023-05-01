import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { constant } from 'src/assets/constant';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private userService: UserService,
    private toastr: ToastrService,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) { }
  userId: any
  ngOnInit(): void {
    this.getUserId()
  }

  profileUrl: any
  getUserId() {
    this.authenticationService.getUserDetailsByToken().subscribe((user: any) => {
      this.userId = user.id
      this.userService.getAllUserDetails(this.userId).subscribe((success) => {
        console.log(success);

        this.profileUrl = this.imageConverter(success.file?.data);

        this.userForm.patchValue(success)

      })

    })
  }

  Department: any = constant.department
  Designation: any = constant.designation

  userForm = new FormGroup({
    firstName: new FormControl(),
    middleName: new FormControl(),
    lastName: new FormControl(),
    contactNo: new FormControl(null, [Validators.required, Validators.min(10)]),
    city: new FormControl(),
    pinCode: new FormControl(),
    designation: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    dob: new FormControl(),
    gender: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl(),
    file: new FormControl(),
  })

  get email() {
    return this.userForm.get('email')
  }

  get password() {
    return this.userForm.get('password')
  }
  get contactNo() {
    return this.userForm.get('contactNo')
  }
  get department() {
    return this.userForm.get('department')
  }
  get designation() {
    return this.userForm.get('designation')
  }
  get username() {
    return this.userForm.get('username')
  }

  updateProfile() {
    let uf = new FormData()

    uf.append('id', this.userId)
    uf.append('firstName', this.userForm.value.firstName)
    uf.append('middleName', this.userForm.value.middleName)
    uf.append('lastName', this.userForm.value.lastName)
    uf.append('contactNo', this.userForm.value.contactNo)
    uf.append('city', this.userForm.value.city)
    uf.append('pinCode', this.userForm.value.pinCode)
    uf.append('designation', this.userForm.value.designation)
    uf.append('department', this.userForm.value.department)
    uf.append('dob', this.userForm.value.dob)
    uf.append('gender', this.userForm.value.gender)
    uf.append('email', this.userForm.value.email)
    uf.append('username', this.userForm.value.username)
    uf.append('password', this.userForm.value.password)
    uf.append('role', 'user')
    if (this.image) {
      uf.append('file', this.image)
    }

    this.userService.updateUser(uf, this.userId).subscribe((success) => {
      if (success) {
        this.toastr.success('User updated', 'Success', {
          timeOut: 3000,
        });
        this.router.navigate(['/landing-page/profile']);
      }
    })


    // if (this.image) {
    //   uf.append('file', this.image)
    // } else {
    //   // this.toastr.error('Plz.. select image', 'Error', {
    //   //   timeOut: 3000,
    //   // });

    //   this.toastr.warning('Please choose valid file !!', 'Validation Error', {
    //     timeOut: 2000,
    //   });
    //   return
    // }
  }

  file: any
  profile: any;
  imageData: any;
  image: any
  chosen: any
  onSelectFile(e: any) {
    this.profileUrl = ''
    if (e.target.value) {
      this.image = e.target.files[0];
      this.chosen = true
    }
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]
    if (this.image && allowedMimeTypes.includes(this.image.type)) {
      let reader = new FileReader()
      reader.onload = () => {
        this.imageData = reader.result
      }
      reader.readAsDataURL(this.image);
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


}
