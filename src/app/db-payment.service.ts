import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
  create_payment(record, user,uid) {
    this.firestore.collection('payment').add(record);
    console.log(user)
    this.firestore.collection('users').doc(uid).update(user);
  }
  searchUser(Id, value) {
 var user = {};
    this.firestore
      .collection('users')
      .doc(Id)
      .ref.get()
      .then(function (doc) {
        if (doc.exists) {
          user['value'] = doc.data()['value'] + value;
          user['displayName'] = doc.data()['displayName'] ;
        }
      })
      .catch(function (error) {
        console.log('There was an error getting your document:', error);
      });
      console.log(user)
return user;
  }
}
