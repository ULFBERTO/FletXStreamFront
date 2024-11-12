import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../services/servicePrueba/my-service.service';

@Component({
  selector: 'app-maps-vehicle',
  standalone: true,
  templateUrl: './maps-vehicle.component.html',
  styleUrls: ['./maps-vehicle.component.css']
})
export class MapsVehicleComponent implements OnInit {
  private map: any;

  constructor(private myService: MyServiceService) {}

  ngOnInit(): void {
    this.initMap();
  }

  private async initMap(): Promise<void> {
    if (typeof window !== 'undefined') {
      const L = await import('leaflet');

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            this.map = L.map('map').setView([userLat, userLon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.map);

            // Define el icono personalizado para la ubicación del usuario
            const userIcon = L.icon({
              iconUrl: 'assets/icons/IcoPunto.png',  // Cambia esto si es necesario
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            });

            // Añade el marcador con el icono en la ubicación del usuario
            L.marker([userLat, userLon], { icon: userIcon })
              .addTo(this.map)
              .bindPopup("Tu ubicación");

            // Cargar ubicaciones de vehículos
            this.loadVehicleLocations();
          },
          (error) => {
            console.error("Error al obtener la ubicación:", error.message);
            this.map = L.map('map').setView([4.711, -74.0721], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.map);

            this.loadVehicleLocations();
          }
        );
      } else {
        console.warn("Geolocalización no soportada por este navegador.");
        this.map = L.map('map').setView([4.711, -74.0721], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);

        this.loadVehicleLocations();
      }
    }
  }
  

  private loadVehicleLocations(): void {
    console.log("Cargando vehículos...");  // Depuración
    this.myService.getDrivers().subscribe((data: any[]) => {
      if (typeof window !== 'undefined') {
        import('leaflet').then(L => {
          // Verifica si los datos de los vehículos están llegando correctamente
          console.log("Datos de vehículos:", data);
  
          // Define el icono personalizado para los vehículos
          const vehicleIcon = L.icon({
            iconUrl: 'assets/icons/vehicle-icon.png',  // Cambia esto si es necesario
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          });
  
          // Añade un marcador para cada vehículo con el icono personalizado
          const markers: L.LatLng[] = [];  // Define el tipo de `markers`
          data.forEach(vehicle => {
            console.log(`Añadiendo marcador para el vehículo: ${vehicle.v_PlacaVehicles}`);  // Depuración
            const marker = L.marker([vehicle.f_Lat, vehicle.f_Long], { icon: vehicleIcon })
              .addTo(this.map)
              .bindPopup(vehicle.v_PlacaVehicles, { closeOnClick: false, autoClose: false, autoPan: false });
  
            marker.openPopup();
            markers.push(marker.getLatLng());
          });
  
          // Calcula la distancia máxima entre los vehículos
          if (markers.length > 1) {
            let maxDistance = 0;
            for (let i = 0; i < markers.length - 1; i++) {
              for (let j = i + 1; j < markers.length; j++) {
                const distance = markers[i].distanceTo(markers[j]);
                if (distance > maxDistance) {
                  maxDistance = distance;
                }
              }
            }
  
            // Ajusta la vista del mapa según la distancia máxima
            const bounds = L.latLngBounds(markers);
            this.map.fitBounds(bounds, { padding: [50, 50] }); // Ajusta el padding según sea necesario
          }
        });
      }
    });
  }
  
}  