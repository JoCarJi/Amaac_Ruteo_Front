import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { OrderService } from 'src/services/pedidos.services';
import { AuthService } from 'src/services/auth.services';
import { SocketService } from 'src/services/socket.services';

@Component({
  selector: 'app-rute',
  templateUrl: './rute.page.html',
  styleUrls: ['./rute.page.scss'],
})
export class RutePage implements OnInit {
  pedidos: any[] = [];
  idWorker: number | null;

  constructor(
    private navCtrl: NavController,
    private orderService: OrderService,
    private toastController: ToastController,
    private authService: AuthService,
    private socketSrv: SocketService
  ) {
    const userId = this.authService.getUserId(); // Assuming getUserId returns a string
    this.idWorker = userId ? Number(userId) : null; // Convert to number or null
  }

  ngOnInit() {
    this.cargarPedidos();
    this.socketSrv.onNuevaUbicacion().subscribe(() => {
      this.cargarPedidos();
    });
  }

  cargarPedidos() {
    this.orderService.obtenerPedidos().subscribe(
      (response: any) => {
        this.pedidos = response.map((pedido: any) => ({
          ...pedido,
          aceptado: false,
          // Mapping the correct fields from backend response
          nombreUsuario: pedido.usuario,   // Use 'usuario' for the person who created the order
          nombreTrabajador: pedido.trabajador // Use 'trabajador' for the worker who accepted it
        }));
      },
      (error: any) => {
        console.error('Error al obtener pedidos:', error);
      }
    );
  }

  generarRuta(pedido: any) {
    const { latitud, longitud } = pedido;
    this.navCtrl.navigateForward('/maps', {
      queryParams: {
        nombre: pedido.nombreUsuario,  // Use 'nombreUsuario' here
        telefono: pedido.telefono,
        detalles: pedido.detalles,
        latitud: latitud,
        longitud: longitud,
        direccion: pedido.direccion
      }
    });
  }

  async aceptarPedido(pedido: any) {
    if (!pedido.idOrden) {
      console.error('El pedido no tiene un idOrden');
      return;
    }

    if (this.idWorker === null || isNaN(this.idWorker)) {
      console.error('El idWorker es nulo o no es un número válido');
      return;
    }

    this.orderService.aceptarOrden(pedido.idOrden, this.idWorker).subscribe(
      async (response: any) => {
        console.log('Orden aceptada:', response);
        pedido.aceptado = true;
        await this.presentToast('Orden aceptada');
      },
      (error: any) => {
        console.error('Error al aceptar la orden:', error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
