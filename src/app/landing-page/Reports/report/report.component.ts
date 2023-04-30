import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { QuestionService } from 'src/app/services/question.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private reportService: ReportService,
    private router: Router,
    private questionService: QuestionService,
    private toastr: ToastrService,

  ) { }
  data: any
  ngOnInit(): void {
    this.getAllReportData();
  }

  view(id: number) {
    this.router.navigate(['/landing-page/comment-room'], {
      queryParams: {
        id: id
      }
    })
  }

  rejectReport(id: number) {
    this.reportService.rejectReportByAdmin(id).subscribe((success) => {
      // console.log(success);
      if (success) {
        this.toastr.warning('Report has been rejected !!', 'Rejection', {
          timeOut: 2000,
        });
        this.getAllReportData()
      }

    })
  }

  getAllReportData() {
    this.reportService.getAllReportDetails().subscribe((success) => {
      this.data = success
      // console.log(this.data);


    })
  }

  blockUserQuestionByQuestionId(id: number) {
    this.questionService.blockUserQuestionByQuestionId(id).subscribe((success) => {
      // console.log(success);
      this.toastr.error('User question has been blocked !!', 'Blocked', {
        timeOut: 2000,
      });
      this.getAllReportData()
    })
  }



}
