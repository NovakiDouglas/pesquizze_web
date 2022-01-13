import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbCategoryService } from 'src/app/db-category.service';
import { ChartService } from 'src/app/chart.service'
import { map } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css'],
})
export class FormDetailsComponent implements OnInit {
  outputArray = [];
  question: any;
  field: string;
  head: string;
  name: string;
  value: number;
  cont: number;
  questao = "teste";
  id: String;

  constructor(
    public dbCategoryService: DbCategoryService,
    public router: ActivatedRoute,
    public chartService: ChartService
    
  ) {}

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.ReadyOneCategory();
  }

  ReadyOneCategory() {
    this.dbCategoryService.getOne_category(this.id.toString()).then((value) => {
      this.ReadyField(value['field']);
      (this.field = value['field']),
        (this.head = value['head']),
        (this.name = value['name']),
        (this.value = value['value']);
    });
  }
  ReadyField(fields) {
    this.cont = 0;
    this.outputArray = JSON.parse(fields);
    console.log(JSON.parse(fields))
  }

   sendQuestionRedirect(qst,type){
    this.chartService.setQuestao(qst,this.id,type);
    
  }

}
