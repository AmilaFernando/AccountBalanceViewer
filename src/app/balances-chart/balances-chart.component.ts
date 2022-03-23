import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ChartAccountDataset } from '../shared/ChartAccountDataset';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-balances-chart',
  templateUrl: './balances-chart.component.html',
  styleUrls: ['./balances-chart.component.css']
})
export class BalancesChartComponent implements OnInit {

  year: number = 0;
  date: Date = new Date();
  isLoaded:boolean = false;

  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'R&D',
      },
      {
        data: [],
        label: 'Canteen',
      },
      {
        data: [],
        label: 'CEO\"s car expenses',
      },
      {
        data: [],
        label: 'Marketing',
      },
      {
        data: [],
        label: 'Parking fines',
      }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Account Balance',
      },
    },
  };

  lineChartType: ChartType = 'line';
  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;



  // accountData: ChartData<'line'> = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //   datasets: [
  //     { label: 'R&D', data: [2,3,3,2,4,5,3,2,2,2], tension: 0.5 },
  //     { label: 'Canteen', data: [], tension: 0.5 },
  //     { label: 'CEO\"s car expenses', data: [2,3,3,5,4,8,3,4,2,2], tension: 0.5 },
  //     { label: 'Marketing', data: [], tension: 0.5 },
  //     { label: 'Parking fines', data: [], tension: 0.5 },
  //   ],
  // };
  // chartOptions: ChartOptions = {
  //   responsive: true,
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: 'Monthly Account Data',
  //     },
  //   },
  // };

  constructor(private accountService: AccountService) {     
  }

  ngOnInit(): void {
    this.year = this.date.getFullYear();
    this.getChartData();
  }

  getChartData(){
    this.accountService.getChartData(this.year).subscribe((data: ChartAccountDataset) => {
      this.lineChartData.datasets[0].data = data.randDdata;
      this.lineChartData.datasets[1].data = data.canteenData;
      this.lineChartData.datasets[2].data = data.ceoCarExpenceData;
      this.lineChartData.datasets[3].data = data.marketingData;
      this.lineChartData.datasets[4].data = data.parkingFinesData;
      this.chart?.update();
    });
  }

  generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }
}
