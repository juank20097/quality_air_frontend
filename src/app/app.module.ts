import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppLayoutModule } from './layout/app.layout.module'; 
import { AppRoutingModule } from './app-routing.module';
/*PrimeNG*/
import { ChartModule } from 'primeng/chart'
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
/*Components*/
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LinearComponent } from './components/linear/linear.component';
import { BarComponent } from './components/bar/bar.component';
import { PieComponent } from './components/pie/pie.component';
import { RadarComponent } from './components/radar/radar.component';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LinearComponent,
    BarComponent,
    PieComponent,
    RadarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule, 
    ChartModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
