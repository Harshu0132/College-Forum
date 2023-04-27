import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MechanicalService {

  constructor(private http: HttpClient) {

  }


  getAllMechDetails(obj: any){
    let url = `http://localhost:3000/api/getAllMechanicalQuestionDetails`
    return this.http.post<any>(url,obj);

  }
}
