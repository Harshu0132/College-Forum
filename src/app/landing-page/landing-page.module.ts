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

const routes: Routes = [
  {
    path: '', component: LandingPageComponent,
    children: [
      {
        path: '', redirectTo: 'home'
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'faculty/administration', component: AdministrationComponent
      },
      {
        path: 'faculty/college-faculty', component: CollegeFacultyComponent
      },
      {
        path: 'departments/cse', component: ComputerScienceComponent
      },
      {
        path: 'departments/electronics', component: ElectronicsComponent
      },
      {
        path: 'departments/mechanical', component: MechanicalComponent
      },
      {
        path: 'departments/civil', component: CivilComponent
      },
      {
        path: 'departments/ai&ds', component: AiAndDsComponent
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
    AiAndDsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class LandingPageModule { }
