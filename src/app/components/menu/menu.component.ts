import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbAnswersService } from 'src/app/db-answers.service';
import { NgAuthService } from 'src/app/ng-auth.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  answers: any;
  pesquisaEfetuada: number;
  users: number;
  surveys: number;

  constructor(public dbAnswersService: DbAnswersService,public ngAuthService: NgAuthService, public router: Router,) { }
  ngOnInit() {
  this.dbAnswersService.ready_answers().subscribe(doc=>{
    this.pesquisaEfetuada = doc.size;
    });
    this.dbAnswersService.ready_users().subscribe(doc=>{
      this.users = doc.size;
      })
      this.dbAnswersService.ready_surveys().subscribe(doc=>{
        this.surveys = doc.size;
        })
  }
  returnPageDashboard() {
    return  this.router.navigate(['/dashboard']);
  }
  returnPageForm() {
    return  this.router.navigate(['/form']);
  }
  returnPageMaps() {
    return  this.router.navigate(['/maps']);
  }


}
