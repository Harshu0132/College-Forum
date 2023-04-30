import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {

  }

  addReport(userId: any, id: number) {
    let url = `http://localhost:3000/api/addReport/${id}`
    return this.http.post<any>(url, userId);
  }

  getAllReportDetails() {
    let url = `http://localhost:3000/api/getAllReportDetails`
    return this.http.get<any>(url);
  }
  
  rejectReportByAdmin(id: number) {
    let url = `http://localhost:3000/api/rejectReportByAdmin/${id}`
    return this.http.delete<any>(url);
  }
}
