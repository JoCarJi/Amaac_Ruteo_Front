import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LocationService } from 'src/services/location.services'; // Adjust the path as necessary
import { AuthService } from 'src/services/auth.services'; // Hypothetical authentication service
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.page.html',
  styleUrls: ['alert.page.scss'],
})
export class AlertPage {
  botellas: number = 0;
  baldes: number = 0;
  userId: number | null = null;

  constructor(
    private geolocation: Geolocation,
    private locationService: LocationService,
    private toastController: ToastController,
    private authService: AuthService // Inject the authentication service
  ) {
    const userIdString = this.authService.getUserId();
    if (userIdString !== null) {
      this.userId = parseInt(userIdString, 10);
    }
  }

  increment(type: string) {
    if (type === 'botellas') {
      this.botellas++;
    } else if (type === 'baldes') {
      this.baldes++;
    }
  }

  decrement(type: string) {
    if (type === 'botellas' && this.botellas > 0) {
      this.botellas--;
    } else if (type === 'baldes' && this.baldes > 0) {
      this.baldes--;
    }
  }

  onQuantityChange(type: string, event: any) {
    const value = parseInt(event.target.value, 10);
    if (type === 'botellas') {
      this.botellas = isNaN(value) ? 0 : value;
    } else if (type === 'baldes') {
      this.baldes = isNaN(value) ? 0 : value;
    }
  }

  generarAlerta() {
    if (this.userId === null) {
      console.error('User ID is null. Cannot save location.');
      return;
    }

    this.geolocation.getCurrentPosition().then((resp) => {
      const locationData = {
        latitud: resp.coords.latitude,
        longitud: resp.coords.longitude,
        idUsuario: this.userId, // Use the dynamic user ID
        botellas: this.botellas,
        baldes: this.baldes
      };

      this.locationService.saveLocation(locationData)
        .subscribe(response => {
          console.log('Location saved:', response);
          this.confirmSolicitud('Solicitud enviada');
        }, error => {
          console.error('Error saving location:', error);
        });
    }).catch((error) => {
      console.error('Error getting location', error);
    });
  }

  async confirmSolicitud(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    this.baldes = 0;
    this.botellas = 0;
  }
}