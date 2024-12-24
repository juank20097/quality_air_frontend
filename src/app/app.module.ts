import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
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
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog'; // Import DialogModule
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';



import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LinearComponent } from './components/linear/linear.component';
import { BarComponent } from './components/bar/bar.component';
import { PieComponent } from './components/pie/pie.component';
import { RadarComponent } from './components/radar/radar.component';
import { TableComponent } from './components/table/table.component';
import keycloakConfig from './keycloak/keycloak.conf';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: keycloakConfig,
      initOptions: {
        onLoad: 'login-required', // Other options: 'check-sso', 'login-required'
        checkLoginIframe: true,
      },
      enableBearerInterceptor:true
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LinearComponent,
    BarComponent,
    PieComponent,
    RadarComponent,
    TableComponent
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
    SliderModule,
    DialogModule,
    ToolbarModule,
    RatingModule,
    KeycloakAngularModule
  ],
  providers: [MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
