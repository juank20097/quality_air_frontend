import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { HomeComponent } from './components/home/home.component';
import { LinearComponent } from './components/linear/linear.component';
import { BarComponent } from './components/bar/bar.component';
import { PieComponent } from './components/pie/pie.component';
import { RadarComponent } from './components/radar/radar.component';

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'linear', component: LinearComponent
      },
      {
        path: 'bar', component: BarComponent
      },
      {
        path: 'pie', component: PieComponent
      },
      {
        path: 'radar', component: RadarComponent
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
