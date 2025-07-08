export class SensorData {
  humedad: number;
  ppmMQ6: number;
  ppmMQ7: number;
  riesgo: number;
  temperatura: number;

  constructor(data: any) {
    this.humedad = data.humedad;
    this.ppmMQ6 = data.ppmMQ6;
    this.ppmMQ7 = data.ppmMQ7;
    this.riesgo = data.riesgo;
    this.temperatura = data.temperatura;
  }

  getColorTag(): string {
    if (this.riesgo < 50) return 'success';
    if (this.riesgo < 75) return 'warning';
    return 'danger';
  }

  getEstadoRiesgo(): string {
    if (this.riesgo < 50) return 'Normal';
    if (this.riesgo < 75) return 'Atención';
    return 'Peligro';
  }

  getIconTag(): string {
    if (this.riesgo < 50) return 'pi pi-check';
    if (this.riesgo < 75) return 'pi pi-exclamation-triangle';
    return 'pi pi-times';
  }
}
