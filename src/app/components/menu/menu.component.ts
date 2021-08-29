import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService } from 'src/app/ng-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public ngAuthService: NgAuthService, public router: Router,) { }
  ngOnInit() {
  }
  returnPageDashboard() {
    return  this.router.navigate(['/dashboard']);
  }
  returnPageForm() {
    return  this.router.navigate(['/form']);
  }


}
