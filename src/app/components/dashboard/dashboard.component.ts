import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService } from "../../ng-auth.service";


declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  

  constructor(public ngAuthService: NgAuthService, public router: Router,) { }
  
  ngOnInit() {

  }
}
