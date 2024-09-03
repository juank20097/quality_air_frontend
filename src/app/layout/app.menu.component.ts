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
                    { label: 'Linear Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/formlayout'] },
                    { label: 'Bar Chart', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Pie Chart', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Doughnut Chart', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Polar Area Chart', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                    { label: 'Radar Chart', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] }
                ]
            }
        ];
    }
}
