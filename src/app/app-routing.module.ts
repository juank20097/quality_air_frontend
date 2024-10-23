import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { HomeComponent } from './components/home/home.component';
import { LinearComponent } from './components/linear/linear.component';
import { BarComponent } from './components/bar/bar.component';
import { PieComponent } from './components/pie/pie.component';
import { RadarComponent } from './components/radar/radar.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guard/authGuard';
import { TableComponent } from './components/table/table.component';


const routes: Routes = [ 
  {
    path: '', component: AppLayoutComponent,
    children: [
      {
        path: '', component: HomeComponent, canActivate: [AuthGuard]
      },
      {
        path: 'linear', component: LinearComponent, canActivate: [AuthGuard]
      },
      {
        path: 'bar', component: BarComponent, canActivate: [AuthGuard]
      },
      {
        path: 'pie', component: PieComponent, canActivate: [AuthGuard]
      },
      {
        path: 'radar', component: RadarComponent, canActivate: [AuthGuard]
      },
      {
        path: 'table', component: TableComponent, canActivate: [AuthGuard]
      },      
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
