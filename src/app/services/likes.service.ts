import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private http: HttpClient) {
  }

  isLike(obj: any, id: number) {
    let url = `http://localhost:3000/api/isLike/${id}`
    return this.http.post<any>(url, obj);
  }

  getAllLikeStatusUserId(id: number) {
    let url = `http://localhost:3000/api/getAllLikeStatusUserId/${id}`
    return this.http.get<any>(url);
  }

  
}
