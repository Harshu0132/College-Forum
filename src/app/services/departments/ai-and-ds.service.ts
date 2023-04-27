import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AiAndDsService {

  constructor(private http: HttpClient) {

  }


  getAllAiAndDsDetails(obj: any){
    let url = `http://localhost:3000/api/getAllAiAndDsQuestionDetails`
    return this.http.post<any>(url,obj);

  }
}
