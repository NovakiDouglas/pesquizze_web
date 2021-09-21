import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService } from "../../ng-auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 120,65, 59, 80, 81, 56], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [42, 22, 55, 77, 66, 33, 22], label: 'Series C'}
  ];
  

  constructor(public ngAuthService: NgAuthService, public router: Router,) { }
  
  ngOnInit() {
  }
}
