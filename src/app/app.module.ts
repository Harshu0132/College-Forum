import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', redirectTo: 'landing-page', pathMatch: 'full'
    // path: '', redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: 'landing-page', 
    loadChildren: () => import('./landing-page/landing-page.module').then(m=> m.LandingPageModule)
  },
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule)
  }
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
