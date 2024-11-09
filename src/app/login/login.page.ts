import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.services';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      async (response) => {
        console.log('Login response:', response); // Verifica la respuesta completa
        console.log('User data:', response.user); // Verifica el objeto user
  
        // Accedemos a idUsuario en lugar de id
        if (response && response.user && response.user.idUsuario) {
          const alert = await this.alertController.create({
            header: 'Login Exitoso',
            message: `Bienvenido, ${response.user.nombre}`,
            buttons: ['OK']
          });
          await alert.present();
  
          // Almacena el ID del usuario en localStorage, utilizando idUsuario
          localStorage.setItem('userId', response.user.idUsuario.toString());
  
          // Redirige basado en el rol del usuario
          if (response.user.rol === 'worker') {
            this.router.navigate(['/rute']);  // Redirige a la ruta del trabajador
          } else if (response.user.rol === 'user') {
            this.router.navigate(['tab-inicial/alert']);  // Redirige a la ruta del cliente
          } else {
            const fallbackAlert = await this.alertController.create({
              header: 'Error',
              message: 'Rol no reconocido',
              buttons: ['OK']
            });
            await fallbackAlert.present();
          }
        } else {
          const errorAlert = await this.alertController.create({
            header: 'Error',
            message: 'Datos de usuario no válidos',
            buttons: ['OK']
          });
          await errorAlert.present();
        }
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Credenciales incorrectas',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
