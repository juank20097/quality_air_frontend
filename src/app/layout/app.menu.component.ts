import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Menú',
                items: [
                    { label: 'Linear Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/linear'] },
                    { label: 'Bar Chart', icon: 'pi pi-fw pi-check-square', routerLink: ['/bar'] },
                    { label: 'Pie Chart', icon: 'pi pi-fw pi-bookmark', routerLink: ['/pie'] },
                    { label: 'Radar Area Chart', icon: 'pi pi-fw pi-table', routerLink: ['/radar'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/table'] }
                ]
            }
        ];
    }
}
