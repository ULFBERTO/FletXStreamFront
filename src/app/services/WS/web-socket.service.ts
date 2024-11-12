// websocket.service.ts

import { Injectable } from '@angular/core';
import * as ActionCable from 'actioncable'; // Importa ActionCable
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private cable: any;
  private driverLocationSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  // Conectar a un canal de WebSocket
  connectToWebSocket(driverId: string) {
    this.cable = ActionCable.createConsumer('ws://localhost:3000/cable');  // Cambia la URL si es necesario

    // Suscribirse al canal de ubicación de conductor
    this.cable.subscriptions.create({ channel: 'DriverLocationChannel', driver_id: driverId }, {
      received: (data: any) => {
        this.driverLocationSubject.next(data);  // Emitir los datos de ubicación recibidos
      }
    });
  }

  // Obtener los datos de ubicación de los conductores
  getDriverLocation() {
    return this.driverLocationSubject.asObservable();
  }
}
