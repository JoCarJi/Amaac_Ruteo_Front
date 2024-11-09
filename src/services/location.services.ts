// src/app/services/location.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:5000'; // Replace with your Flask server URL

  constructor(private http: HttpClient) {}

  saveLocation(locationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardar-ubicacion`, locationData);
  }
   // Servicio para calcular la ruta enviando latitud, longitud y destino al backend
   calcularRuta(latitud: number, longitud: number, direccionDestino: string): Observable<any> {
    const body = {
      latitud: latitud,
      longitud: longitud,
      direccion: direccionDestino
    };
    return this.http.post<any>(`${this.apiUrl}/calcular-ruta`, body);
  }
}