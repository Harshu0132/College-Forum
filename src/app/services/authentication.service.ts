import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {

  }

  register(obj: any) {
    let url = 'http://localhost:3000/api/register'
    return this.http.post<any>(url, obj);
  }

  login(obj: any) {
    let url = 'http://localhost:3000/api/login'
    return this.http.post<any>(url, obj);
  }

  loggedIn(){
    return !!localStorage.getItem('userAuth')
  }

  getToken(){
    return localStorage.getItem('userAuth')
  }

  logOut(){
    localStorage.removeItem('userAuth')
  }
  
  getUserDetailsByToken(){
    let url = `http://localhost:3000/api/sendUserDetails`
    return this.http.get(url)
  }

}
