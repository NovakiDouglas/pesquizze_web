import { Component, OnInit } from '@angular/core';
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
  public barChartLabels = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
  ];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Feminino' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Masculino' },
  ];

  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  ngOnInit() {
    this.recieverData();
  }
}
