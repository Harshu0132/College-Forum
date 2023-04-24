import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  file: any
  profile: any;
  imageData: any;

  constructor(private router: Router) {
    console.log(this.imageData);
    
  }


  CafeForm = new FormGroup({
    cafeName: new FormControl(),
    description: new FormControl(''),
    price: new FormControl(),
    location: new FormControl(),
    image: new FormControl(),
  })

  ngOnInit(): void {
  }


  
  image: any
  chosen: any
  register() {
    let cf = new FormData()
    cf.append('cafeName',this.CafeForm.value.cafeName)
    cf.append('description',this.CafeForm.value.description)
    cf.append('price',this.CafeForm.value.price)
    cf.append('location',this.CafeForm.value.location)
    cf.append('status','false')

    // if(this.image){
    //   cf.append('file',this.image)    
    // }else{
    //   this.toastr.error('Plz.. select image', 'Error', {
    //     timeOut: 3000,
    //   });
    //   return
    // }

    // this.imageService.createCafe(cf, this.userId).subscribe((success) => {
    //   console.log(success);
    //   this.toastr.success('Cafe details added successfully, wait for admins approvement!!', 'Success', {
    //     timeOut: 2000,
    //   });
    //   this.router.navigate(['/landing-page/book-table'])
    // }, (err) => {
    //   console.log("err", err);

    // })
    // this.imageData = null


  }


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
      }
      reader.readAsDataURL(this.image);
    }

  }


}
