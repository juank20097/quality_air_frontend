import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


@Component({
    selector: 'app-linear',
    templateUrl: './linear.component.html',
    styleUrls: ['./linear.component.scss']
})
export class LinearComponent implements OnInit, OnDestroy {
    lineData: any;
    lineOptions: any;

    subscription: Subscription;
    intervalId: any;
    maxDataPoints = 10;
    sensorValue: number = 0;
    sensorStatus: string = 'success'; // success | warning | danger
    sensorIcon: string = 'pi pi-check'; // ícono que cambia según estado


    constructor(private layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });
    }

    ngOnInit() {
        this.initCharts();
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.lineData = {
            labels: [],
            datasets: [
                {
                    label: 'Sensor A',
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: .4
                },
                {
                    label: 'SensorB',
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    tension: .4
                },
                {
                    label: 'Real-Time 3 Dataset',
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-800'),
                    borderColor: documentStyle.getPropertyValue('--primary-800'),
                    tension: .4
                },
                {
                    label: 'Real-Time 4 Dataset',
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-700'),
                    borderColor: documentStyle.getPropertyValue('--primary-700'),
                    tension: .4
                }
            ]
        };

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            animation: false,
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    min: 1,
                    max: 10,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
        this.startDataSimulation();
    }

    startDataSimulation() {
        this.intervalId = setInterval(() => {
            const newValue = Math.floor(Math.random() * 10) + 1;
            const currentTime = new Date().toLocaleTimeString();

            const dataset = this.lineData.datasets[0];
            dataset.data.push(newValue);
            this.lineData.labels.push(currentTime);

            if (dataset.data.length > this.maxDataPoints) {
                dataset.data.shift();
                this.lineData.labels.shift();
            }

            this.sensorValue = newValue;

            // Estado según valor
            if (this.sensorValue < 6) {
                this.sensorStatus = 'success';
                this.sensorIcon = 'pi pi-check';
            } else if (this.sensorValue >= 6 && this.sensorValue <= 8) {
                this.sensorStatus = 'warning';
                this.sensorIcon = 'pi pi-exclamation-triangle';
            } else {
                this.sensorStatus = 'danger';
                this.sensorIcon = 'pi pi-times-circle';
            }

            // Forzar la detección de cambios
            this.lineData = { ...this.lineData };
        }, 5000);


    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
