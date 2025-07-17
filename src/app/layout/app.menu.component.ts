import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    userRole: string | null = null;

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.userRole = localStorage.getItem('role');

        this.model = [
            {
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                ]
            },
            {
                label: 'Sensor A',
                items: [
                    { label: 'Húmedad', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/sensor', 'a', 'humedad'] },
                    { label: 'PPM MQ6', icon: 'pi pi-fw pi-check-square', routerLink: ['/sensor', 'a', 'ppmMQ6'] },
                    { label: 'PPM MQ7', icon: 'pi pi-fw pi-bookmark', routerLink: ['/sensor', 'a', 'ppmMQ7'] },
                    { label: 'Riesgo', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/sensor', 'a', 'riesgo'] },
                    { label: 'Temperatura', icon: 'pi pi-fw pi-table', routerLink: ['/sensor', 'a', 'temperatura'] }
                ]
            },
            {
                label: 'Sensor B',
                items: [
                    { label: 'Húmedad', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/sensor', 'b', 'humedad'] },
                    { label: 'PPM MQ6', icon: 'pi pi-fw pi-check-square', routerLink: ['/sensor', 'b', 'ppmMQ6'] },
                    { label: 'PPM MQ7', icon: 'pi pi-fw pi-bookmark', routerLink: ['/sensor', 'b', 'ppmMQ7'] },
                    { label: 'Riesgo', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/sensor', 'b', 'riesgo'] },
                    { label: 'Temperatura', icon: 'pi pi-fw pi-table', routerLink: ['/sensor', 'b', 'temperatura'] }
                ]
            },
        ];

        // Solo añadir el menú de usuario si es admin
        if (this.userRole === 'admin') {
            this.model.push({
                label: 'Usuario',
                items: [
                    { label: 'Crear usuario', icon: 'pi pi-fw pi-table', routerLink: ['/table'] }
                ]
            });
        }
    }
}
