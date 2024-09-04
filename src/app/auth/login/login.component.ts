import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  password!: string;

  constructor(private authService: AuthService,private router:Router){}

  login() {
    this.authService.login();
    this.router.navigate(['/']); // Redirige al HomeComponent después de iniciar sesión
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
