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

  getDetailsByQuestionId(id: number){
    let url = `http://localhost:3000/api/getDetailsByQuestionId/${id}`
    return this.http.get<any>(url);

  }

  commentCounter(id: number){
    let url = `http://localhost:3000/api/commentCounter/${id}`
    return this.http.get<any>(url);
  }
  likeCounter(id: number){
    let url = `http://localhost:3000/api/likeCounter/${id}`
    return this.http.get<any>(url);
  }
  unLikeCounter(id: number){
    let url = `http://localhost:3000/api/unLikeCounter/${id}`
    return this.http.get<any>(url);
  }

  getAllLikesByQuestionId(id: number) {
    let url = `http://localhost:3000/api/getAllLikesByQuestionId/${id}`
    return this.http.get<any>(url);
  }

}


