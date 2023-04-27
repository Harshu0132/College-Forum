import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElectronicsService {

  constructor(private http: HttpClient) {

  }


  getAllEleDetails(obj: any){
    let url = `http://localhost:3000/api/getAllElectronicsQuestionDetails`
    return this.http.post<any>(url,obj);

  }
}
