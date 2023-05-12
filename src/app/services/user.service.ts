import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getDetailsByDesignation(obj: any) {
    let url = `http://localhost:3000/api/getDetailsByDesignation`
    return this.http.post<any>(url, obj);
  }

  getAllUserDetails(id: any) {
    let url = `http://localhost:3000/api/getAllUserDetails/${id}`
    return this.http.get<any>(url);
  }
  updateUser(obj: any, id: any) {
    // console.log(id);
    let url = `http://localhost:3000/api/updateUser/${id}`
    return this.http.put<any>(url, obj);
  }

  getAllUser() {
    let url = `http://localhost:3000/api/getAllUser`
    return this.http.get<any>(url);
  }
}


