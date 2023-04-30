import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SectionComponent } from './section/section.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdministrationComponent } from './Faculty/administration/administration.component';
import { CollegeFacultyComponent } from './Faculty/college-faculty/college-faculty.component';
import { ComputerScienceComponent } from './Departments/computer-science/computer-science.component';
import { ElectronicsComponent } from './Departments/electronics/electronics.component';
import { MechanicalComponent } from './Departments/mechanical/mechanical.component';
import { CivilComponent } from './Departments/civil/civil.component';
import { AiAndDsComponent } from './Departments/ai-and-ds/ai-and-ds.component';
import { AluminiComponent } from './alumini/alumini.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddQuestionComponent } from './add-question/add-question.component';
import { CommentRoomComponent } from './comment-room/comment-room.component';
import { AuthGuard } from '../auth.guard';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportComponent } from './Reports/report/report.component';
import { AdminRouteGuard } from '../admin-route.guard';
import { ToastComponent } from './toast/toast.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';




const routes: Routes = [
  {
    path: '', component: LandingPageComponent,
    children: [
      {
        path: '', redirectTo: 'home'
      },
      {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard]
      },
      {
        path: 'faculty/administration', component: AdministrationComponent, canActivate: [AuthGuard]
      },
      {
        path: 'faculty/college-faculty', component: CollegeFacultyComponent, canActivate: [AuthGuard]
      },
      {
        path: 'departments/cse', component: ComputerScienceComponent, canActivate: [AuthGuard]
      },
      {
        path: 'departments/electronics', component: ElectronicsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'departments/mechanical', component: MechanicalComponent, canActivate: [AuthGuard]
      },
      {
        path: 'departments/civil', component: CivilComponent, canActivate: [AuthGuard]
      },
      {
        path: 'departments/ai&ds', component: AiAndDsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'alumini', component: AluminiComponent, canActivate: [AuthGuard]
      },
      {
        path: 'add-question', component: AddQuestionComponent, canActivate: [AuthGuard]
      },
      {
        path: 'comment-room', component: CommentRoomComponent, canActivate: [AuthGuard]
      },
      {
        path: 'report', component: ReportComponent, canActivate: [AdminRouteGuard]

      },
      {
        path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
      },
    ]
  },

]


@NgModule({
  declarations: [
    LandingPageComponent,
    HomeComponent,
    HeaderComponent,
    SectionComponent,
    FooterComponent,
    SidebarComponent,
    AdministrationComponent,
    CollegeFacultyComponent,
    ComputerScienceComponent,
    ElectronicsComponent,
    MechanicalComponent,
    CivilComponent,
    AiAndDsComponent,
    AluminiComponent,
    AddQuestionComponent,
    CommentRoomComponent,
    ReportComponent,
    ToastComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule,
    RouterModule.forChild(routes),
    ToastrModule,


  ]
})
export class LandingPageModule { }
