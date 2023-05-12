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

  getDetailsByQuestionId(id: number) {
    let url = `http://localhost:3000/api/getDetailsByQuestionId/${id}`
    return this.http.get<any>(url);

  }

  commentCounter(id: number) {
    let url = `http://localhost:3000/api/commentCounter/${id}`
    return this.http.get<any>(url);
  }
  likeCounter(like: any, id: number) {
    let url = `http://localhost:3000/api/likeCounter/${id}`
    return this.http.post<any>(url,like);
  }

  getAllLikesByQuestionId(id: number) {
    let url = `http://localhost:3000/api/getAllLikesByQuestionId/${id}`
    return this.http.get<any>(url);
  }

  blockUserQuestionByQuestionId(id: number) {
    let url = `http://localhost:3000/api/blockUserQuestionByQuestionId/${id}`
    return this.http.delete<any>(url);
  }

  deleteQuestionByQuestionId(id: number) {
    let url = `http://localhost:3000/api/deleteQuestionByQuestionId/${id}`
    return this.http.delete<any>(url);
  }
  getAllQuestionDetails() {
    let url = `http://localhost:3000/api/getAllQuestionDetails`
    return this.http.get<any>(url);
  }



}


