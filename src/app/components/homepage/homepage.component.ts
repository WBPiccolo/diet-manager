import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DietService } from 'src/app/services/diet.service';
import { ChartComponent } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: 'homepage-component',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: ChartOptions;

  constructor(private dietService: DietService) {}
  dietData: Observable<any> = new Observable();

  ngOnInit(): void {
    this.chartOptions = {
      series: [],
      labels: [],
      //series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: 'pie',
      },
      //labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
    this.dietData = this.dietService.getDietData().pipe(
      tap((res) => {
        for (let key of Object.keys(res)) {
          this.chartOptions.labels.push(key);
          this.chartOptions.series.push(res[key]);
        }
      })
    );
  }
}
