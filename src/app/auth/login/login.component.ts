import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  identifier!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSignIn() {
    if (!this.identifier || !this.password) {
      this.messageService.add({ severity: 'warn', summary: 'Campos vacíos', detail: 'Debe ingresar usuario y contraseña' });
      return;
    }

    this.authService.authenticator(this.identifier, this.password).subscribe(
      response => {
        if (response.result === 'validPassword') {
          localStorage.setItem('user', this.identifier);
          localStorage.setItem('role', response.rol || 'user');

          this.authService.login(); // Cambia el estado de autenticación si aplica
          this.router.navigate(['/']); // Redirige al home o dashboard
          this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: 'Inicio de sesión exitoso' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error de autenticación', detail: 'Credenciales inválidas' });
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error del servidor', detail: 'No se pudo iniciar sesión' });
        console.error('Error en autenticación:', error);
      }
    );
  }
}
