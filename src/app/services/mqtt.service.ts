import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private socket = io('http://localhost:3000'); // tu backend Node.js

  constructor() {}

  recibirDatos(): Observable<any> {
  return new Observable(observer => {
    this.socket.on('mqtt-data', (data) => {
      console.log('📥 [MqttService] Dato recibido:', data); // Log al recibir
      observer.next(data);
    });
  });
}
}
