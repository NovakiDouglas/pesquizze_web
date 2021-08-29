import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbCategoryService } from 'src/app/db-category.service';
import { map } from 'rxjs/operators';

declare var $: any;
var id;

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

  constructor(
    public dbCategoryService: DbCategoryService,
    public router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    id = this.router.snapshot.paramMap.get('id');
    this.ReadyOneCategory();
  }

  ReadyOneCategory() {
    this.dbCategoryService.getOne_category(id).then((value) => {
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
    console.log(this.outputArray);
  }
}
