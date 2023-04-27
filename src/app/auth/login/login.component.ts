import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }




  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
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
