import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.services';
import { OrderService } from 'src/services/pedidos.services';
import { SocketService } from 'src/services/socket.services';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  pedidos: any[] = [];
  idUser: number | null;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private socketSrv: SocketService
  ) {    
    const userId = this.authService.getUserId();
    this.idUser = userId ? Number(userId) : null;
    }

  ngOnInit() {
    this.cargarPedidosUser();
    this.socketSrv.onNuevaUbicacion().subscribe(() => {
      this.cargarPedidosUser();
    });
    this.socketSrv.onOrdenAceptada().subscribe(() => {
      this.cargarPedidosUser();
    })
  }

  cargarPedidosUser(){
    this.orderService.obtenerPedidosUser(this.idUser).subscribe(
      (response: any) =>{
        this.pedidos = response.map((pedido: any) => ({
          ...pedido
        }));
        console.log(this.pedidos)
      },
      (error: any) =>{
        console.error('Error al obtener pedidos: ',error);
      }
    );
  }

}
