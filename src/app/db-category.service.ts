import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class DbCategoryService {

  constructor(private firestore: AngularFirestore,) { }

  create_category(record){
    return this.firestore.collection('categorias').add(record);
  }
  ready_category(){
    return this.firestore.collection('categorias').snapshotChanges();
  }

  
  update_category(recordID, record){
    this.firestore.doc('categorias/'+recordID).update(record);
  }
  delete_category(recordID){
    this.firestore.doc('categorias/'+recordID).delete();
  }
  getOne_category(id: string): any {
    return this.firestore
               .collection('categorias')
               .doc(id)
               .ref
               .get()
               .then((doc) => {
                   if (doc.exists) {
                       return doc.data();
                       
                   } else {
                       return 'Doc does not exits';
                   }
                })
                .catch((err) => {
                   console.error(err);
                });
}



}
