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

}


