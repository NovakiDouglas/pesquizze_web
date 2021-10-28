import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DbPaymentService {
  constructor(private firestore: AngularFirestore) {}

  ready_paymentPending() {
    return this.firestore.collection('paymentPending').snapshotChanges();
  }
  update_paymentPending(Id, record) {
    this.firestore.collection('paymentPending').doc(Id).update(record);
  }
  create_payment(record) {
    this.firestore.collection('payment').add(record);
  }
  async update_money(Id, record) {
    console.log(record);
    this.firestore.collection('users').doc(Id).update(record);
  }
  searchUser(Id, value) {
    let record = {};

    this.firestore
      .collection('users')
      .doc(Id)
      .ref.get()
      .then(function (doc) {
        if (doc.exists) {
          record['value'] = 10;
          console.log('There is no document!');
        }
      })
      .catch(function (error) {
        console.log('There was an error getting your document:', error);
      });

    this.update_money(Id, record);
  }
}
