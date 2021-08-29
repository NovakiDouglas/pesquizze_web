import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { DbCategoryService } from 'src/app/db-category.service';


declare var $: any;
var id;
var formBuilder;

const formData = [];
let record = {};
let options = {
  i18n: {
    locale: 'pt-BR',
  },
};
let fields = [
  {
    label: 'Star Rating',
    attrs: {
      type: 'starRating',
    },
    icon: '🌟',
  },
];
let templates = {
  starRating: function (fieldData) {
    return {
      field: '<span id="' + fieldData.name + '">',
      onRender: function () {
        $(document.getElementById(fieldData.name)).rateYo({ rating: 3.6 });
      },
    };
  },
};

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {


  category: any;
  field: string;
  head: string;
  name: string;
  value: number;

  constructor(
    public dbCategoryService: DbCategoryService,
    public router: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    formBuilder = $(document.getElementById('fb-editor')).formBuilder({
      fields,
      templates,
      options,
    });
    id = this.router.snapshot.paramMap.get("id");
    this.ReadyOneCategory();
    
  }


  ReadyOneCategory() {
    this.dbCategoryService.getOne_category(id).then((value) => {
      console.log('from component-', value);
      this.field = value['field'],
        this.head = value['head'],
        this.name = value['name'],
        this.value = value['value']
        formBuilder.actions.setData(this.field);
    });
  }
 

  EditRecord(Nome: string, Valor: number) {
    let idRecebido = id;
    let record = {};
    record['field'] = formBuilder.actions.getData('json');
    record['head'] = 'head';
    record['name'] = Nome;
    record['value'] = Valor;
    this.dbCategoryService.update_category(idRecebido,record);
  }
  

}
