import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation, Geoposition, PositionError } from '@awesome-cordova-plugins/geolocation/ngx'; 
import { LocationService } from 'src/services/location.services';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  map: any;
  directionsService: any;
  directionsRenderer: any;
  latitud!: number;
  longitud!: number;
  direccionDestino!: string;
  ubicacionActual = { latitud: 0, longitud: 0 };
  marker!: any; // AdvancedMarkerElement
  isNavigating = false; // Estado de navegación

  constructor(
    private route: ActivatedRoute,
    private geolocation: Geolocation,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.latitud = parseFloat(params['latitud']);
      this.longitud = parseFloat(params['longitud']);
      this.direccionDestino = params['direccion'];
  
      if (!this.direccionDestino) {
        console.error('La dirección de destino no se proporcionó.');
        return;
      }
  
      this.geolocation.getCurrentPosition().then((resp: Geoposition) => {
        this.ubicacionActual.latitud = resp.coords.latitude;
        this.ubicacionActual.longitud = resp.coords.longitude;
  
        // Espera a que el DOM esté completamente cargado antes de cargar el mapa
        setTimeout(() => {
          this.loadMap();
        }, 100); // Pequeña demora para asegurar que el elemento esté disponible
  
        // Empieza a observar el cambio de ubicación en tiempo real
        this.watchPosition();
      }).catch((error: PositionError) => {
        console.error('Error obteniendo la ubicación actual', error);
      });
    });
  }

  // Función para iniciar el mapa
  async loadMap() {
    const mapOptions = {
      center: { lat: this.latitud, lng: this.longitud },
      zoom: 13,
      mapId: 'DEMO_MAP_ID', // Cambia esto por tu ID de mapa
    };
  
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
  
    // Crear un elemento div para el marcador
    const markerContent = document.createElement('div');
    markerContent.style.color = 'red';
    markerContent.textContent = '🚗'; // Agrega el emoji o el contenido que desees
  
    // Asegúrate de que el mapa se inicialice antes de agregar el marcador
    this.marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: this.ubicacionActual.latitud, lng: this.ubicacionActual.longitud },
      map: this.map,
      content: markerContent // Usar el nodo DOM creado
    });
  
    this.calculateAndDisplayRoute();
  }
  

  // Función para calcular y mostrar la ruta
  calculateAndDisplayRoute() {
    if (!this.direccionDestino) {
      console.error('Falta la dirección de destino.');
      return;
    }

    this.directionsService.route(
      {
        origin: { lat: this.ubicacionActual.latitud, lng: this.ubicacionActual.longitud },
        destination: { lat: this.latitud, lng: this.longitud },
        travelMode: 'DRIVING',
      },
      (result: any, status: any) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(result);
        } else {
          console.error('Error al calcular la ruta:', status);
        }
      }
    );
  }

  // Función para observar el cambio de ubicación en tiempo real
  watchPosition() {
    this.geolocation.watchPosition().subscribe(
      (position: any) => {
        if (position.coords) {
          this.ubicacionActual.latitud = position.coords.latitude;
          this.ubicacionActual.longitud = position.coords.longitude;

          // Mueve el marcador a la nueva ubicación
          this.updateMarkerPosition();

          if (this.isNavigating) {
            this.map.setCenter(new google.maps.LatLng(this.ubicacionActual.latitud, this.ubicacionActual.longitud));
            this.map.setZoom(18); // Zoom cercano para ver detalles de las calles
          }
        } else {
          console.error('Error obteniendo la ubicación', position);
        }
      },
      (error: any) => {
        console.error('Error en la suscripción de geolocalización:', error);
      }
    );
  }

  // Función para actualizar la posición del marcador de la flecha
  updateMarkerPosition() {
    this.marker.position = new google.maps.LatLng(this.ubicacionActual.latitud, this.ubicacionActual.longitud);
  }

  // Función para iniciar la navegación
  startNavigation() {
    this.isNavigating = true;
    this.watchPosition(); // Comienza a observar la ubicación en tiempo real
  }

  // Función para regresar
  goBack() {
    window.history.back();
  }
}
