import { Component, OnInit } from '@angular/core';

import { DbPaymentService } from 'src/app/db-payment.service'
declare var $: any;
var markers = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  paymentPending: any;
  value:number;
  categoryId:String;
  identifier:String;
  payer:String;
  situation:String;
  userID:String;
  Id:String;
  time: Date;
  myDate = new Date();
  myDateTemp = new Date(this.myDate);
  user = {};
  IdsPendings: String [] = [];

  

  constructor(public dbPaymentService: DbPaymentService) { }

  ngOnInit(): void {
    $(document).ready(function() {
    $('#select-all').click(function() {
        var checked = this.checked;
        $('input[type="checkbox"]').each(function() {
        this.checked = checked;
    });

    }) 
});

    
    this.dbPaymentService.ready_paymentPending().subscribe(data => {
      this.paymentPending = data.map(e => {
        return{
          Id: e.payload.doc.id,
          categoryId: e.payload.doc.data()['categoryId'],
          identifier: e.payload.doc.data()['identifier'],
          payer: e.payload.doc.data()['payer'],
          time: e.payload.doc.data()['time'],
          situation: e.payload.doc.data()['situation'],
          userID: e.payload.doc.data()['userID'],
          value: e.payload.doc.data()['value'],
          categoryName: e.payload.doc.data()['nomeSurvey'],
          userName: e.payload.doc.data()['nomeCliente']
        }
      })
    })
  }
  openModal(item:any){
    this.Id = item.Id;
    this.value = item.value;
    this.categoryId = item.categoryId;
    this.identifier = item.identifier;
    this.payer = item.payer;
    this.situation = item.situation;
    this.userID = item.userID;
  this.time = item.time;
  this.user = this.dbPaymentService.searchUser(this.userID,this.value);
  this.sendPaymentPening();
 }

 changeCheckbox(idrecebido: String){
   //alert(idrecebido)
   if(this.IdsPendings.indexOf(idrecebido) == -1){
    this.IdsPendings.push(idrecebido);
   }else{
    this.IdsPendings.forEach((element,index)=>{
      if(element==idrecebido) this.IdsPendings.splice(index,1);
   });
   }
 }

payMarkers(){
  markers = [];
  $("input:checkbox[name=check]:checked").each(function(){
    markers.push($(this).val());
});
markers.forEach(element => {
  console.log(element)
});
}

   sendPaymentPening(){
    let record = {};
    record['situation'] = "pago";
     this.dbPaymentService.update_paymentPending(this.Id,record);
    
     this.sendPayment();
   }

   sendPayment(){
    let record = {};
    
    record['agencia'] = "";
    record['balance'] = this.value;
    record['conta'] = "";
    record['cpf'] = "";
    record['pix'] = "";
    record['time'] = this.myDateTemp;
    record['identifier'] = this.userID ;
    record['method'] = "cartao";
    record['name'] = this.payer;
    record['type'] =this. payer;
    this.dbPaymentService.create_payment(record,this.userID);
   }


}
