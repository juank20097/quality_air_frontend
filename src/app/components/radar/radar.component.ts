import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit, OnDestroy {

  polarData: any;

  radarData: any;

  polarOptions: any;

  radarOptions: any;

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

      this.polarData = {
          datasets: [{
              data: [
                  11,
                  16,
                  7,
                  3
              ],
              backgroundColor: [
                  documentStyle.getPropertyValue('--indigo-500'),
                  documentStyle.getPropertyValue('--purple-500'),
                  documentStyle.getPropertyValue('--teal-500'),
                  documentStyle.getPropertyValue('--orange-500')
              ],
              label: 'My dataset'
          }],
          labels: [
              'Indigo',
              'Purple',
              'Teal',
              'Orange'
          ]
      };

      this.polarOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              r: {
                  grid: {
                      color: surfaceBorder
                  }
              }
          }
      };

      this.radarData = {
          labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
          datasets: [
              {
                  label: 'My First dataset',
                  borderColor: documentStyle.getPropertyValue('--indigo-400'),
                  pointBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                  pointBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                  pointHoverBackgroundColor: textColor,
                  pointHoverBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                  data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                  label: 'My Second dataset',
                  borderColor: documentStyle.getPropertyValue('--purple-400'),
                  pointBackgroundColor: documentStyle.getPropertyValue('--purple-400'),
                  pointBorderColor: documentStyle.getPropertyValue('--purple-400'),
                  pointHoverBackgroundColor: textColor,
                  pointHoverBorderColor: documentStyle.getPropertyValue('--purple-400'),
                  data: [28, 48, 40, 19, 96, 27, 100]
              }
          ]
      };

      this.radarOptions = {
          plugins: {
              legend: {
                  labels: {
                      fontColor: textColor
                  }
              }
          },
          scales: {
              r: {
                  grid: {
                      color: textColorSecondary
                  }
              }
          }
      };
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}
