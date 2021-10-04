import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Chart } from '../app/chart.model';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private data: Chart;
  private listAnswer: Chart[];
  private questao: String;
  private idSurvey: String;
  private a = ['1', '1', '2', '3', '3', '1'];
  private unique;

  constructor(private router: Router, public afs: AngularFirestore) {}

  setData(data) {
    this.data = data;
  }

  getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  getFirestoreData() {
     this.afs
      .collection<any>('answers', (ref) =>
        ref.where('identifier', '==', this.idSurvey)
      )
      .snapshotChanges()
      .subscribe((actionArray) => {
        this.listAnswer = actionArray.map((item) => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data(),
          } as Chart;
        });
      });

    this.listAnswer.forEach((element) => {
      var res = JSON.parse(element.result.toString());
      var results = [];
      for(let element in res['results']){
        results.push({
          id: element,
          name: res['results'][element]
        })
      }
      
    });

    //filtro unico
    this.unique = this.a.filter((item, i, ar) => ar.indexOf(item) === i);
    alert(this.unique);

    /*
    this.afs.collection("answers", ref => ref.where('identifier', '==', this.idSurvey)).snapshotChanges().pipe(
      map(actions => actions.map(
        res => {
          this.data = {id: res.payload.doc.id, ...res.payload.doc.data() as Chart}
        }
      ))
    );*/
  }

  setQuestao(questao,  id) {
    this.questao = questao;
    this.idSurvey = id;
  }

  getQuestao() {
    return this.questao;
  }

  clearData() {
    this.data = undefined;
  }
}
