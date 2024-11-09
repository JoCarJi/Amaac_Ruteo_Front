import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000'; // Cambia esto por la URL de tu servidor

  constructor(private http: HttpClient) {}

  obtenerPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedidos`);
  }

  obtenerPedidosUser(idUser: number | null): Observable<any>{
    return this.http.get(`${this.apiUrl}/solicitudes_user/${idUser}`)
  }

  aceptarOrden(idOrden: number, idWorker: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/aceptar-orden/${idOrden}`, { idWorker });
  }
}