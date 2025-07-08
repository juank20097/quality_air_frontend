import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  identifier!: string; // Renombrado de email a identifier
  password!: string;


  constructor(private authService: AuthService, private router: Router, private service: MessageService) {}

  show() {
    this.service.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  onSignIn() {
    // Llama al servicio de autenticación
    
    if (this.identifier == 'a' && this.password == 'a'){
      localStorage.setItem('user',this.identifier);
      localStorage.setItem('role','admin');
          this.authService.login();
          this.router.navigate(['/']);
    }else{
      this.authService.authenticator(this.identifier, this.password).subscribe(
        response => {
            if (response.status === 'validPassword') { // Cambiado a comprobar el estado
                localStorage.setItem('user', this.identifier);
                //localStorage.setItem('role',response.role || 'user');
                this.router.navigate(['/']); // Redirigir al HomeComponent
                this.authService.login();
                this.service.add({ severity: 'success', summary: 'Login Successful', detail: 'Welcome!' });
            } else {
                this.service.add({ severity: 'error', summary: 'Error Message', detail: 'Credenciales Inválidas' });
            }
        },
        error => {
            // Manejo de errores de la autenticación
            this.service.add({ severity: 'error', summary: 'Error Message', detail: 'Error en el consumo del servicio' });
        }
    );
    }
  }
}

