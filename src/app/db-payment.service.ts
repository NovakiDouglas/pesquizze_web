import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { interval } from 'rxjs';
var user = {};
@Injectable({
  providedIn: 'root',
})
export class DbPaymentService {
  constructor(private firestore: AngularFirestore) {}
  

  ready_paymentPending() {
    return this.firestore.collection('paymentPending', ref => ref.where('situation', '==', 'pendente')).snapshotChanges();
  }
  update_paymentPending(Id, record) {
    this.firestore.collection('paymentPending').doc(Id).update(record);
  }
  create_payment(record,uid) {
    this.firestore.collection('payment').add(record);    
    interval(2000).subscribe ( x => {
      this.firestore.collection('users').doc(uid).update(user)
    })
    //;
  }
  searchUser(Id, value) {
 
 var valor;
    this.firestore
      .collection('users')
      .doc(Id)
      .ref.get()
      .then(function (doc) {
        if (doc.exists) {
          user['value'] = doc.data()['value'] + value;
        }
      })
      .catch(function (error) {
        console.log('There was an error getting your document:', error);
      });

      return user;
  }
}
