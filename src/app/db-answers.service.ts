import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbAnswersService {
  numero:number;

  constructor(private firestore: AngularFirestore) { }
  ready_answers(){
    return this.firestore.collection("answers").get();
  }
  ready_answers_Snap(){
    return this.firestore.collection("answers").snapshotChanges();
  }
  ready_users(){
    return this.firestore.collection("users").get();
  }
  ready_users_Snap(){
    return this.firestore.collection("users").snapshotChanges();
  }
  ready_surveys(){
    return this.firestore.collection("categorias").get();
  }
  ready_surveys_Snap(){
    return this.firestore.collection("categorias").snapshotChanges();
  }
}
