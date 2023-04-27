import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {

  }

  addComment(obj: any, id: number) {
    let url = `http://localhost:3000/api/addComment/${id}`
    return this.http.post<any>(url, obj);
  }

  getAllCommentByQuestionId(id: number) {
    let url = `http://localhost:3000/api/getAllCommentsByQuestionId/${id}`
    return this.http.get<any>(url);
  }
}
