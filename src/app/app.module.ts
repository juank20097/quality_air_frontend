import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppLayoutModule } from './layout/app.layout.module'; 
import { AppRoutingModule } from './app-routing.module';
import { ChartModule } from 'primeng/chart'
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LinearComponent } from './components/linear/linear.component';
import { BarComponent } from './components/bar/bar.component';
import { PieComponent } from './components/pie/pie.component';
import { RadarComponent } from './components/radar/radar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LinearComponent,
    BarComponent,
    PieComponent,
    RadarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule, 
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
