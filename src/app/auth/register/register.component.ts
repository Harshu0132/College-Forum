import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // file: any
  // profile: any;
  // imageData: any;

  constructor(private router: Router, private AuthService: AuthenticationService) {
    console.log(this.imageData);
    
  }


  userForm = new FormGroup({
    firstName: new FormControl(),
    middleName: new FormControl(''),
    lastName: new FormControl(),
    contactNo: new FormControl(),
    city: new FormControl(),
    pinCode: new FormControl(),
    designation: new FormControl(),
    department: new FormControl(),
    dob: new FormControl(),
    gender: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    role: new FormControl(),
    file: new FormControl(),
   
  })

  ngOnInit(): void {
  }


  

  register() {
    let uf = new FormData()
    uf.append('firstName',this.userForm.value.firstName)
    uf.append('middleName',this.userForm.value.middleName)
    uf.append('lastName',this.userForm.value.lastName)
    uf.append('contactNo',this.userForm.value.contactNo)
    uf.append('city',this.userForm.value.city)
    uf.append('pinCode',this.userForm.value.pinCode)
    uf.append('designation',this.userForm.value.designation)
    uf.append('department',this.userForm.value.department)
    uf.append('dob',this.userForm.value.dob)
    uf.append('gender',this.userForm.value.gender)
    uf.append('email',this.userForm.value.email)
    uf.append('username',this.userForm.value.username)
    uf.append('password',this.userForm.value.password)
    uf.append('role',this.userForm.value.role)

    if(this.image){
      uf.append('file',this.image)    
    }else{
      // this.toastr.error('Plz.. select image', 'Error', {
      //   timeOut: 3000,
      // });

      alert("Plzz... choose valid file")
      return
    }

    this.AuthService.register(uf).subscribe((success) => {
      console.log(success);
      // this.toastr.success('Cafe details added successfully, wait for admins approvement!!', 'Success', {
      //   timeOut: 2000,
      // });
      alert("success")
      if(success){

        this.router.navigate(['/landing-page/home'])
      }
    }, (err) => {
      console.log("err", err);

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
      // console.log(this.image);
      
      this.chosen = true
    }

    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]

    if (this.image && allowedMimeTypes.includes(this.image.type)) {
      let reader = new FileReader()
      reader.onload = () => {
        this.imageData = reader.result
        console.log(this.imageData);
        
      }
      reader.readAsDataURL(this.image);

      console.log(this.image);
    
    }

  }


}
