import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { DbCategoryService } from 'src/app/db-category.service';


declare var $: any;
var id;
var formBuilder;

const formData = [];
let record = {};
let options = {
  disableFields: [
    'autocomplete',
    'button',
    'header',
    'hidden',
    'file',
    'paragraph',
    'select',
    'text'
  ]
  
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
  qntPesq: number;
  valorTotal: number;
  city: string;
  state: string;
  country: string;
  qnt = 0;
  vlr = 0;
  balance = 0;

  constructor(
    public dbCategoryService: DbCategoryService,
    public router: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    formBuilder = $(document.getElementById('fb-editor')).formBuilder(options);
    id = this.router.snapshot.paramMap.get("id");
    this.ReadyOneCategory();
    this.populaEnd();
    
    
  }


  ReadyOneCategory() {
    this.dbCategoryService.getOne_category(id).then((value) => {
      this.field = value['field'],
        this.name = value['name'],
        this.value = value['value'],
        this.qntPesq = value['qntPesq'],
        this.valorTotal = value['valorTotal']
        this.city = value['city'];
        this.state = value['state'];
        this.country= value['country'];
        formBuilder.actions.setData(this.field);
    });
  }


  modelChangeQnt(e) {
    this.vlr = e * this.balance ;
  }
 
  Balance(){
    const obj = JSON.parse(formBuilder.formData);
    this.balance = 0;
    obj.forEach(element => {
      var type = element['type'];
      if(type == "number"){
        this.balance = this.balance + 0.54;
      };
      if(type == "date"){
        this.balance = this.balance + 0.66;
      };
      if(type == "checkbox-group"){
        this.balance = this.balance + 0.78;
      };
      if(type == "radio-group"){
        this.balance = this.balance + 0.80;
      };
      if(type == "textarea"){
        this.balance = this.balance + 0.85;
      };

    });
  }

  EditRecord(Nome: string, QntPesq: number, ValorTotal: number,City: string,State: string,Country: string) {
    let idRecebido = id;
    let record = {};
    record['field'] = formBuilder.actions.getData('json');
    record['name'] = Nome;
    record['value'] = Number(this.balance);
    record['qntPesq'] = Number(QntPesq);
    record['valorTotal'] = Number(QntPesq) * this.balance;
    record['city'] = City;
    record['state'] = State;
    record['country'] = Country;
    this.dbCategoryService.update_category(idRecebido,record);
  }
  
  populaEnd() {
    function montaCidade(estado, pais){
      $.ajax({
        type:'GET',
        url:'http://api.londrinaweb.com.br/PUC/Cidades/'+estado+'/'+pais+'/0/10000',
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        async:false
      }).done(function(response){
        let cidades='';
    
        $.each(response, function(c, cidade){
    
          cidades+='<option value="'+cidade+'">'+cidade+'</option>';
    
        });
    
        // PREENCHE AS CIDADES DE ACORDO COM O ESTADO
        $('#cidade').html(cidades);
    
      });
    }
    
    function montaUF(pais){
      $.ajax({
        type:'GET',
        url:'http://api.londrinaweb.com.br/PUC/Estados/'+pais+'/0/10000',
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        async:false
      }).done(function(response){
        let estados='';
        $.each(response, function(e, estado){
    
          estados+='<option value="'+estado.UF+'">'+estado.Estado+'</option>';
    
        });
    
        // PREENCHE OS ESTADOS BRASILEIROS
        $('#estado').html(estados);
    
        // CHAMA A FUNÇÃO QUE PREENCHE AS CIDADES DE ACORDO COM O ESTADO
        montaCidade($('#estado').val(), pais);
    
        // VERIFICA A MUDANÇA NO VALOR DO CAMPO ESTADO E ATUALIZA AS CIDADES
        $('#estado').change(function(){
          montaCidade($(this).val(), pais);
        });
    
      });
    }
    
    function montaPais(){
      $.ajax({
        type:	'GET',
        url:	'http://api.londrinaweb.com.br/PUC/Paisesv2/0/1000',
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        async:false
      }).done(function(response){
        
        let paises='';
    
        $.each(response, function(p, pais){
    
          if(pais.Pais == 'Brasil'){
            paises+='<option value="'+pais.Sigla+'" selected>'+pais.Pais+'</option>';
          } else {
            paises+='<option value="'+pais.Sigla+'">'+pais.Pais+'</option>';
          }
    
        });
    
        // PREENCHE O SELECT DE PAÍSES
        $('#pais').html(paises);
    
        // PREENCHE O SELECT DE ACORDO COM O VALOR DO PAÍS
        montaUF($('#pais').val());
    
        // VERIFICA A MUDANÇA DO VALOR DO SELECT DE PAÍS
        $('#pais').change(function(){
          if($('#pais').val() == 'BR'){
            // SE O VALOR FOR BR E CONFIRMA OS SELECTS
            $('#estado').remove();
            $('#cidade').remove();
            $('#campo_estado').append('<select id="estado"></select>');
            $('#campo_cidade').append('<select id="cidade"></select>');
    
            // CHAMA A FUNÇÃO QUE MONTA OS ESTADOS
            montaUF('BR');		
          } else {
            // SE NÃO FOR, TROCA OS SELECTS POR INPUTS DE TEXTO
            $('#estado').remove();
            $('#cidade').remove();
            $('#campo_estado').append('<input type="text" id="estado">');
            $('#campo_cidade').append('<input type="text" id="cidade">');
          }
        })
    
      });
    }
    
    montaPais();
  }

}
