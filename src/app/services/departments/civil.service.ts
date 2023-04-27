import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CivilService {

  constructor(private http: HttpClient) {

  }


  getCivilDetails(obj: any){
    let url = `http://localhost:3000/api/getAllCivilQuestionDetails`
    return this.http.post<any>(url,obj);

  }
}
