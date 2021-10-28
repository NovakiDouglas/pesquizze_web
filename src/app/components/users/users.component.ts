import { Component, OnInit } from '@angular/core';

import { DbPaymentService } from 'src/app/db-payment.service'
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  paymentPending: any;
  display='none';
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
  

  constructor(public dbPaymentService: DbPaymentService) { }

  ngOnInit(): void {
    
    this.dbPaymentService.ready_paymentPending().subscribe(data => {
      this.paymentPending = data.map(e => {
        return{
          id: e.payload.doc.id,
          categoryId: e.payload.doc.data()['categoryId'],
          identifier: e.payload.doc.data()['identifier'],
          payer: e.payload.doc.data()['payer'],
          time: e.payload.doc.data()['time'],
          situation: e.payload.doc.data()['situation'],
          userID: e.payload.doc.data()['userID'],
          value: e.payload.doc.data()['value'],
        }
      })
    })
  }
  openModal(item:any){
    this.display='block';
    this.Id = item.id;
    this.value = item.value;
    this.categoryId = item.categoryId;
    this.identifier = item.identifier;
    this.payer = item.payer;
    this.situation = item.situation;
    this.userID = item.userID;
  this.time = item.time;
    
 }
   onCloseHandled(){
      this.display='none';
   }

   sendPaymentPening(){
    let record = {};
    record['situation'] = "pago";
     this.dbPaymentService.update_paymentPending(this.Id,record);
     this.dbPaymentService.searchUser(this.userID,this.value)
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
    this.dbPaymentService.create_payment(record);
   }


}
