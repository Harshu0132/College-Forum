import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CseService {

  constructor(private http: HttpClient) {

  }


  getAllCseDetails(obj: any, id: number){
    let url = `http://localhost:3000/api/getAllCseQuestionDetails/${id}`
    return this.http.post<any>(url,obj);
  }


}
