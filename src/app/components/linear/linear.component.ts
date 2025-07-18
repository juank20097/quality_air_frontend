import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MqttService } from 'src/app/services/mqtt.service';
import { SensorData } from 'src/app/models/sensor-data.model';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-linear',
    templateUrl: './linear.component.html',
    styleUrls: ['./linear.component.scss']
})
export class LinearComponent implements OnInit, OnDestroy {
    sensorId!: string; // 'a' o 'b'
    dato!: keyof SensorData; // 'riesgo', 'temperatura', etc.
    deviceMap: Record<string, string> = {
        a: 'lora32-lilygo-01',
        b: 'lora32-lilygo-02'
    };

    lineData: any;
    lineOptions: any;
    maxDataPoints = 10;
    subscription!: Subscription;

    sensorEstado: string = 'Normal';
    sensorColor: 'success' | 'warning' | 'danger' = 'success';
    sensorIcon: string = 'pi pi-check';
    ultimoValor: number | null = null;



    constructor(
        private route: ActivatedRoute,
        private mqttService: MqttService,
        private layoutService: LayoutService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.sensorId = params['sensorId'];
            this.dato = params['dato'];

            this.initCharts();
            this.listenToMqtt();
        });

        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe(() => this.initCharts());
    }

    initCharts() {
        const style = getComputedStyle(document.documentElement);
        const color = style.getPropertyValue('--primary-500');
        const textColor = style.getPropertyValue('--text-color');
        const textColorSecondary = style.getPropertyValue('--text-color-secondary');
        const surfaceBorder = style.getPropertyValue('--surface-border');

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: { color: textColor }
                }
            },
            animation: false,
            scales: {
                x: {
                    ticks: { color: textColorSecondary },
                    grid: { color: surfaceBorder, drawBorder: false }
                },
                y: {
                    ticks: { color: textColorSecondary },
                    grid: { color: surfaceBorder, drawBorder: false }
                }
            }
        };

        this.lineData = {
            labels: [],
            datasets: [{
                label: this.dato,
                data: [],
                fill: false,
                backgroundColor: color,
                borderColor: color,
                tension: 0.4
            }]
        };
    }

    listenToMqtt() {
        this.mqttService.recibirDatos().subscribe(data => {
            const payload = data?.payload?.uplink_message?.decoded_payload;
            const device = data?.payload?.end_device_ids?.device_id;

            if (!payload || device !== this.deviceMap[this.sensorId]) return;

            const sensor = new SensorData(payload);
            const value = sensor[this.dato];
            const time = new Date().toLocaleTimeString();

            if (typeof value !== 'number') return;

            if (this.ultimoValor === value) return;

            this.ultimoValor = value;

            this.actualizarEstado(value);

            this.lineData.datasets[0].data.push(value);
            this.lineData.labels.push(time);

            if (this.lineData.datasets[0].data.length > this.maxDataPoints) {
                this.lineData.datasets[0].data.shift();
                this.lineData.labels.shift();
            }

            // Forzar redibujar
            this.lineData = { ...this.lineData };
        });
    }
    actualizarEstado(valor: number) {
        switch (this.dato) {
            case 'riesgo':
                if (valor < 30) {
                    this.sensorEstado = 'Normal';
                    this.sensorColor = 'success';
                    this.sensorIcon = 'pi pi-check';
                } else if (valor < 70) {
                    this.sensorEstado = 'Alerta';
                    this.sensorColor = 'warning';
                    this.sensorIcon = 'pi pi-exclamation-triangle';
                } else {
                    this.sensorEstado = 'Peligro';
                    this.sensorColor = 'danger';
                    this.sensorIcon = 'pi pi-times-circle';
                }
                break;

            case 'temperatura':
                if (valor < 25) {
                    this.sensorEstado = 'Normal';
                    this.sensorColor = 'success';
                    this.sensorIcon = 'pi pi-check';
                } else if (valor < 30) {
                    this.sensorEstado = 'Alerta';
                    this.sensorColor = 'warning';
                    this.sensorIcon = 'pi pi-exclamation-triangle';
                } else {
                    this.sensorEstado = 'Peligro';
                    this.sensorColor = 'danger';
                    this.sensorIcon = 'pi pi-times-circle';
                }
                break;

            case 'humedad':
                if (valor < 50) {
                    this.sensorEstado = 'Peligro';
                    this.sensorColor = 'danger';
                    this.sensorIcon = 'pi pi-times-circle';
                } else if (valor < 70) {
                    this.sensorEstado = 'Alerta';
                    this.sensorColor = 'warning';
                    this.sensorIcon = 'pi pi-exclamation-triangle';
                } else {
                    this.sensorEstado = 'Normal';
                    this.sensorColor = 'success';
                    this.sensorIcon = 'pi pi-check';
                }
                break;

            case 'ppmMQ6':
            case 'ppmMQ7':
                if (valor < 50) {
                    this.sensorEstado = 'Normal';
                    this.sensorColor = 'success';
                    this.sensorIcon = 'pi pi-check';
                } else if (valor < 100) {
                    this.sensorEstado = 'Alerta';
                    this.sensorColor = 'warning';
                    this.sensorIcon = 'pi pi-exclamation-triangle';
                } else {
                    this.sensorEstado = 'Peligro';
                    this.sensorColor = 'danger';
                    this.sensorIcon = 'pi pi-times-circle';
                }
                break;

            default:
                this.sensorEstado = 'Desconocido';
                this.sensorColor = 'success';
                this.sensorIcon = 'pi pi-info-circle';
        }
    }



    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
