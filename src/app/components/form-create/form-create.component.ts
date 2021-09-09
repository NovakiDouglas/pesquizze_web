import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbCategoryService } from 'src/app/db-category.service';

declare var $: any;
var json;
var formBuilder;

const formData = [];
let options = {
  i18n: {
    locale: 'pt-BR',
  },

      defaultFields: [{
        className: "form-control",
        label: "First Name",
        placeholder: "Enter your first name",
        name: "first-name",
        required: true,
        type: "text"
      }, {
        className: "form-control",
        label: "Select",
        name: "select-1454862249997",
        type: "select",
        multiple: "true",
        values: [{
          label: 'Custom Option 1',
          value: 'test-value'
        }, {
          label: 'Custom Option 2',
          value: 'test-value-2'
        }]
      }, {
        label: "Radio",
        name: "select-1454862249997",
        type: "radio-group"
      }]
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
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css'],
})
export class FormCreateComponent implements OnInit {
  category: any;
  field: string;
  head: string;
  name: string;
  value: number;

  constructor(
    public dbCategoryService: DbCategoryService,
    public router: Router
  ) {}

  ngOnInit(): void {
    formBuilder = $(document.getElementById('fb-editor')).formBuilder({
      fields,
      templates,
      options,
    });
  }

  CreateRecord(Nome: string, Valor: number) {
    let record = {};
    record['field'] = formBuilder.actions.getData('json');
    record['head'] = 'head';
    record['name'] = Nome;
    record['value'] = Valor;
    this.dbCategoryService.create_category(record);
  }
}
