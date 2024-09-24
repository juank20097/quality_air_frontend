import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [ConfirmationService]
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private confirmationService: ConfirmationService, private router: Router) { }

    userIdentifier: string | null = null;

    ngOnInit(): void {
      // if(this.authService.isLoggedIn()){
      //     this.userIdentifier = this.authService.getUser();
      // }
  }
    
    confirm1() {
      this.confirmationService.confirm({
          key: 'confirm1',
          message: 'Está seguro de Cerrar Sesión?',
          accept: () => {
           // this.authService.logout();
            this.router.navigate(['/login']);
          },
          reject: () => {
            console.log('Logout cancelled');
          }
      });
  }
}
