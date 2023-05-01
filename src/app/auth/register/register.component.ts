import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { constant } from 'src/assets/constant';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // file: any
  // profile: any;
  // imageData: any;

  constructor(private router: Router,
    private AuthService: AuthenticationService,
    private toastr: ToastrService,
  ) {
    // console.log(this.imageData);

    this.userForm.patchValue({
      "firstName": "abc",
      "middleName": "abc",
      "lastName": "abc",
      "contactNo": 9923527956,
      "city": "abcd",
      "pinCode": 441111,
      "designation": "Admin",
      "department": "Computer Science & Engineering",
      "dob": "2023-01-01",
      "gender": "Male",
      "email": "abc@gmail.com",
      "username": "abc",
      "password": "abc",
      "role": null,
      "file": null
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

  ngOnInit(): void {
  }

  register() {

    console.log(this.userForm.value);


    let uf = new FormData()
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

    console.log(uf);
    
    if (this.image) {
      uf.append('file', this.image)
    } else {
      // this.toastr.warning('Please choose valid file !!', 'Validation Error', {
      //   timeOut: 2000,
      // });
      // return
    }

    this.AuthService.register(uf).subscribe((success) => {
      // console.log(success);
      if (success) {
        this.toastr.success('User registration done successfully!!', 'Registration', {
          timeOut: 2000,
        });
        this.router.navigate(['/landing-page/home'])
      }
    }, (err) => {
      this.toastr.success(`${err.error.msg}`, 'Validation error', {
        timeOut: 2000,
      });

    })
    this.imageData = null


  }


  file: any
  profile: any;
  imageData: any;

  image: any
  chosen: any
  onSelectFile(e: any) {
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


}
