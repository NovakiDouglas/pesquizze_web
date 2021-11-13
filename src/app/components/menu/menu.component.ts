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
  this.dbAnswersService.ready_answers_Snap().subscribe(doc=>{
    this.pesquisaEfetuada = doc.length;
    });
    this.dbAnswersService.ready_users_Snap().subscribe(doc=>{
      this.users = doc.length;
      })
      this.dbAnswersService.ready_surveys_Snap().subscribe(doc=>{
        this.surveys = doc.length;
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
  returnPageUsers() {
    return  this.router.navigate(['/users']);
  }


}
