import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbCategoryService } from 'src/app/db-category.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})



export class FormComponent implements OnInit {

  category: any;
  type: string;
  required: boolean;
  label: string;
  className: string;
  name: string;
  access:boolean;

  constructor(public dbCategoryService: DbCategoryService, public router: Router) { }
  ngOnInit() {
    this.dbCategoryService.ready_category().subscribe(data => {
      this.category = data.map(e =>{
        return{
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['name'],
          value: e.payload.doc.data()['value'],
          //inserir demais atributos que serao retornados para a tela de listagem
        };
      })
      console.log(this.dbCategoryService);
    });
  }
  CreateRecord(){
    let record = {};
    record['type'] = this.category;
    record['required'] = this.category;
    record['label'] = this.category;
    record['className'] = this.category;
    record['name'] = this.category;
    record['access'] = this.category;
    this.dbCategoryService.create_category(record).then(resp => {
      this.type = "";
      this.required = true;
      this.label = "";
      this.className = "";
      this.name = "";
      this.access = true;
    })
    .catch(error => {
      console.log(error);
      });
  }
  RemoveRecord(rowID){
    this.dbCategoryService.delete_category(rowID);
  }
  EditRecord(record){
    record.EditType = record.type;
      record.EditRequired = record.required;
      record.EditLabel = record.label;
      record.EditClassName = record.className;
      record.EditName = record.name;
      record.EditAccess = record.access;
  }
  UpdateRecord(recordRow){
    let record = {};
    record['type'] = recordRow.EditType;
    record['required'] = recordRow.EditRequired;
    record['label'] = recordRow.EditLabel;
    record['className'] = recordRow.EditClassName;
    record['name'] = recordRow.EditName;
    record['access'] = recordRow.EditAccess;
    this.dbCategoryService.update_category(recordRow.id, record);

  }

  returnPageCreateForm() {
    return  this.router.navigate(['/form-create']);
  }

  returnPageDetailForm() {
    return  this.router.navigate(['/form-detail']);
  }
}