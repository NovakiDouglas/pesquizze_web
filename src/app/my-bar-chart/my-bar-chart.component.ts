import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartService } from 'src/app/chart.service';
@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css'],
})
export class MyBarChartComponent implements OnInit {
  question: String;
  

    recieverData(){

     this.chartService.getFirestoreData();
     this.question = this.chartService.getQuestao();
    }

  constructor(public chartService: ChartService) {}
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels = this.chartService.labelChart;
  public pieChartData = this.chartService.dataChart;
  public pieChartType = 'pie';

  public doughnutChartLabels = this.chartService.labelChart;
  public doughnutChartData = this.chartService.dataChart;
  public doughnutChartType = 'doughnut';

  ngOnInit() {
    this.recieverData();
  }
}
