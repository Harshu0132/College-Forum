import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {

  }

  addQuestion(obj: any, id: number) {
    let url = `http://localhost:3000/api/addQuestion/${id}`
    return this.http.post<any>(url, obj);
  }
}


