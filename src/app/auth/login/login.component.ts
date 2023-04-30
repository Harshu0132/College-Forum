import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }


  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
  }

  signIn() {
    this.authService.login(this.loginForm.value).subscribe(success => {
      console.log(success);
      if (success.token) {
        localStorage.setItem('userAuth', success.token)

        this.router.navigate(['/landing-page/home'])
      }
    })
  }

}
