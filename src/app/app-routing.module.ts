import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { HomeComponent } from './components/home/home.component';
import { LinearComponent } from './components/linear/linear.component';
import { LoginComponent } from './auth/login/login.component';
import { TableComponent } from './components/table/table.component'; 
import { AuthGuard } from './auth/guard/authGuard';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'sensor/:sensorId/:dato', component: LinearComponent, canActivate: [AuthGuard] },
      {
        path: 'table',
        component: TableComponent,
        canActivate: [AuthGuard],
        data: { role: 'admin' } // Solo admin puede acceder
      }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
