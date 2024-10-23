import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppLayoutModule } from './layout/app.layout.module'; 
import { AppRoutingModule } from './app-routing.module';
/* PrimeNG */
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
/* Components */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LinearComponent } from './components/linear/linear.component';
import { BarComponent } from './components/bar/bar.component';
import { PieComponent } from './components/pie/pie.component';
import { RadarComponent } from './components/radar/radar.component';
import { LoginComponent } from './auth/login/login.component';
import { TableComponent } from './components/table/table.component';
 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LinearComponent,
    BarComponent,
    PieComponent,
    RadarComponent,
    LoginComponent,
    TableComponent,
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
    PasswordModule,
    MessagesModule, 
    MessageModule,
    ToastModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    SliderModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
