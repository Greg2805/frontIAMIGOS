import { Injectable } from '@angular/core';
import { connect, MqttClient } from 'mqtt';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private client: MqttClient;

  constructor() {
    this.client = connect('ws://172.20.10.1:9001'); // Remplace avec l'IP de ton PC

    this.client.on('connect', () => {
      console.log('✅ Connecté au broker MQTT via WebSocket');
    });

    this.client.on('error', (err) => {
      console.error('❌ Erreur MQTT:', err);
    });
  }

  publish(topic: string, message: string) {
    if (this.client.connected) {
      this.client.publish(topic, message);
      console.log("📤 Message publié: ${message}");
    } else {
      console.warn('⚠ Client MQTT non connecté');
    }
  }
}
