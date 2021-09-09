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
  ready_users(){
    return this.firestore.collection("users").get();
  }
  ready_surveys(){
    return this.firestore.collection("categorias").get();
  }
}
