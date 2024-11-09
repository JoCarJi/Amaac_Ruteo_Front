import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.services';// Importar el servicio de autenticación

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  nombre: string = '';
  apell: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';
  rol: string = 'user';  // Por defecto asignamos el rol de 'user'

  constructor(private router: Router, private authService: AuthService) {} // Injectar AuthService

  onRegister() {
    const user = {
      nombre: this.nombre,
      apell: this.apell,
      telefono: this.telefono,
      email: this.email,
      password: this.password,
      rol: this.rol
    };

    // Llamada al servicio para registrar al usuario
    this.authService.register(user).subscribe(
      (res) => {
        console.log('Usuario registrado:', res);
        this.router.navigate(['/login']);  // Redirigir a la página de login después del registro
      },
      (err) => {
        console.error('Error al registrar:', err);
        alert('Error al registrar el usuario');
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
