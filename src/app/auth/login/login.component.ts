import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[MessageService]
})
export class LoginComponent {
  identifier!: string; // Renombrado de email a identifier
  password!: string;

  constructor(private authService: AuthService, private router: Router, private service: MessageService) {}

  show(){
    this.service.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  onSignIn() {
    // codigo de prueba login
    if (this.identifier == 'a' && this.password == 'a'){
      localStorage.setItem('user',this.identifier);
          this.authService.login();
          this.router.navigate(['/']);
    }else{
    // Llamar al método authenticate del AuthService
    this.authService.authenticate(this.identifier, this.password).subscribe(
      (response) => {
        // Suponiendo que la respuesta tiene una propiedad 'status' que indica el resultado
        if (response.status === 'validPassword') {
          localStorage.setItem('user',this.identifier);
          this.authService.login();
          this.router.navigate(['/']); // Redirigir al HomeComponent
        } else {
          this.service.add({ severity: 'error', summary: 'Error Message', detail: 'Credenciales Inválidas' });
        }
      },
      (error) => {
        console.error('Error en el consumo de servicio:', error);
        this.service.add({ severity: 'error', summary: 'Error Message', detail: 'Error en el consumo de servicio' });
      }
    );
  }
}
}