import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  // Escucha cuando el trabajador se conecta
  onTrabajadorConectado() {
    return this.socket.fromEvent('respuesta_conexion');
  }

  // Escucha para recibir nuevas ubicaciones
  onNuevaUbicacion() {
    return this.socket.fromEvent('nueva_ubicacion');
  }

  onOrdenAceptada(){
    return this.socket.fromEvent('orden_aceptada');
  }

  // Función para emitir eventos si es necesario
  conectarTrabajador(data: any) {
    this.socket.emit('conectar_trabajador', data);
  }
}
