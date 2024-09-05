import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  identifier!: string; // Renombrado de email a identifier
  password!: string;
  valCheck: string[] = ['remember'];

  constructor(private authService: AuthService, private router: Router) {}

  onSignIn() {
    // Llamar al método authenticate del AuthService
    this.authService.authenticate(this.identifier, this.password).subscribe(
      (response) => {
        // Suponiendo que la respuesta tiene una propiedad 'status' que indica el resultado
        if (response.status === 'validPassword') {
          localStorage.setItem('user', 'authenticated'); // Almacenar estado de autenticación
          localStorage.setItem('identifier', this.identifier) // para la topbar del layout
          this.router.navigate(['/']); // Redirigir al HomeComponent
        } else {
          alert('Invalid credentials'); // Mostrar alerta en caso de credenciales inválidas
        }
      },
      (error) => {
        console.error('Error en el consumo de servicio:', error);
        alert('LLene todos los campos correctamente.'); // Mostrar alerta en caso de error
      }
    );
  }

}