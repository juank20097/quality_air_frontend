import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit, OnDestroy {

  pieData: any;

  pieOptions: any;

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

      this.pieData = {
          labels: ['A', 'B', 'C'],
          datasets: [
              {
                  data: [540, 325, 702],
                  backgroundColor: [
                      documentStyle.getPropertyValue('--indigo-500'),
                      documentStyle.getPropertyValue('--purple-500'),
                      documentStyle.getPropertyValue('--teal-500')
                  ],
                  hoverBackgroundColor: [
                      documentStyle.getPropertyValue('--indigo-400'),
                      documentStyle.getPropertyValue('--purple-400'),
                      documentStyle.getPropertyValue('--teal-400')
                  ]
              }]
      };

      this.pieOptions = {
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: textColor
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
