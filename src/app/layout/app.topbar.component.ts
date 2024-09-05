import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [ConfirmationService]
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private confirmationService: ConfirmationService, private router: Router) { }

    confirm1() {
      this.confirmationService.confirm({
          key: 'confirm1',
          message: 'Está seguro de Cerrar Sesión?',
          accept: () => {
            this.router.navigate(['/login']);
          },
          reject: () => {
            console.log('Logout cancelled');
          }
      });
  }

    confirmLogout() {
        this.confirmationService.confirm({
          message: 'Are you sure you want to log out?',
          header: 'Logout Confirmation',
          icon: 'pi pi-exclamation-triangle',
          
        });
      }

}
