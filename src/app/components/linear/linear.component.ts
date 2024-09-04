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
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'First Dataset',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                  borderColor: documentStyle.getPropertyValue('--primary-500'),
                  tension: .4
              },
              {
                  label: 'Second Dataset',
                  data: [28, 48, 40, 19, 86, 27, 90],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                  borderColor: documentStyle.getPropertyValue('--primary-200'),
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
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}
