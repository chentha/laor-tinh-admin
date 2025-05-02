import { Component, ViewChild, OnInit } from '@angular/core';
import { AllService } from '@core/service/allApi.service';
import { TokenService } from '../../core/service/token.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexTooltip,
  ApexLegend,
} from 'ng-apexcharts';
import { take } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptions2!: Partial<ChartOptions>;
  public areaChartOptions!: Partial<ChartOptions>;

  // Initialize barChartOptions to avoid undefined errors
  public barChartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      height: 320,
      type: 'area',
      foreColor: '#9aa0ac',
    },
    colors: ['#0091ff'],
    plotOptions: {
      bar: {
        columnWidth: '60%',
      },
    },
    legend: {
      show: true,
    },
    tooltip: {
      theme: 'dark',
    },
    grid: {
      show: true,
    },
  };

  constructor(private allapi: AllService, private tokenServie:TokenService) {
    // let tokenValue = localStorage.getItem('token');
    // if(tokenValue){
    //   this.tokenServie.setValue(tokenValue);
    // }
    
  }

  ngOnInit() {
    this.getChartData();

  }
  
  

  getChartData() {
    this.allapi.getData(this.allapi.reportUrl).subscribe({
      next: (response: any) => {
        if (response?.data) {
          this.barChartOptions = {
            ...this.barChartOptions,
            series: [
              {
                name: 'Actual',
                data: [
                  { x: 'Roles', y: response.data.totalRoles ?? 0 },
                  { x: 'Users', y: response.data.totalUsers ?? 0 },
                  { x: 'Price', y: response.data.totalPrice ?? 0 },
                  { x: 'Monthly Expenses', y: response.data.monthlyExpenses ?? 0 },
                  { x: 'Products', y: response.data.totalProducts ?? 0 },
                  { x: 'Monthly Profit', y: response.data.monthlyProfit ?? 0 },
                  { x: 'Orders', y: response.data.totalOrders ?? 0 },
                  { x: 'Monthly Income', y: response.data.monthlyIncome ?? 0 },
                ],
              },
            ]
          };
        }
      },
      error: (error) => {
        console.error('API Error:', error);
      },
    });
  }
  
}
