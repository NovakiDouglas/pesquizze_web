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
  private idSurvey: String = '9ULmNQYcJAaYhAIgcyZD';
  private a = [];
  ///
  public labelChart = [];
  private label = [];
  private chart = [];
  public dataChart = [];
  public questionType: String;
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
    this.a = [];
    this.labelChart = [];
    //filtro unico
    this.unique = this.a.filter((item, i, ar) => ar.indexOf(item) === i);
    //alert(this.unique);

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
    var results = [];
    this.listAnswer.forEach((el) => {
      var res = [el.result];
      for (let element in res) {
        results.push(JSON.parse(res[element].toString()));
      }
    });

    results.forEach((element) => {
      var res = element.results;
      var results = [];
      for (let element in res) {
        results.push({
          id: element,
          name: res[element],
        });
      }
      results.forEach((element) => {
        switch (this.questionType) {
          case 'number': {
            if (element.name['answer_format']['question_type'] == 'Integer') {
              if (element.name['results']['answer'] == null) {
                this.a.push('N/R');
              } else {
                this.a.push(element.name['results']['answer']);
                this.label = this.a.reduce((acc, val) => {
                  if (!acc[val])
                    acc[val] = {
                      value: val,
                      quantidade: 1,
                    };
                  else acc[val]['quantidade']++;
                  return acc;
                }, {});
                this.labelChart = Object.entries(this.label).map((val) => {
                  return val[1]['value'];
                });
                this.dataChart = Object.entries(this.label).map((val) => {
                  return val[1]['quantidade'];
                });
              }
            }
            break;
          }
          case 'checkbox-group': {
            if (
              element.name['answer_format']['question_type'] == 'MultipleChoice'
            ) {
              var r = element.name['results'];
              if (r['answer'] == null) {
                this.a.push('N/R');
              } else {
                r['answer'].forEach((element) => {
                  this.a.push(element['text']);
                });

                this.label = this.a.reduce((acc, val) => {
                  if (!acc[val])
                    acc[val] = {
                      value: val,
                      quantidade: 1,
                    };
                  else acc[val]['quantidade']++;
                  return acc;
                }, {});

                this.labelChart = Object.entries(this.label).map((val) => {
                  return val[1]['value'];
                });
                this.dataChart = Object.entries(this.label).map((val) => {
                  return val[1]['quantidade'];
                });
              }
            }
            break;
          }
          case 'radio-group': {
            if (
              element.name['answer_format']['question_type'] == 'SingleChoice'
            ) {
              var r = element.name['results'];
              if (r['answer'] == null) {
                this.a.push('N/R');
                console.log('N/R');
              } else {
                r['answer'].forEach((element) => {
                  console.log(element['text']['answer']);
                });
              }
            }
            break;
          }
          case 'textarea': {
            if (element.name['answer_format']['question_type'] == 'Text') {
              if (element.name['results']['answer'] == null) {
                this.a.push('N/R');
                console.log('N/R');
              } else {
                this.a.push(element.name['results']['answer']);
                this.label = this.a.reduce((acc, val) => {
                  if (!acc[val])
                    acc[val] = {
                      value: val,
                      quantidade: 1,
                    };
                  else acc[val]['quantidade']++;
                  return acc;
                }, {});
                this.labelChart = Object.entries(this.label).map((val) => {
                  return val[1]['value'];
                });
                this.dataChart = Object.entries(this.label).map((val) => {
                  return val[1]['quantidade'];
                });
              }
            }
            break;
          }
          case 'date': {
            if (
              element.name['answer_format']['date_time_answer_style'] == 'Date'
            ) {
              if (element.name['results']['answer'] == null) {
                this.a.push('N/R');
                console.log('N/R');
              } else {

                this.a.push(element.name['results']['answer']);
                this.label = this.a.reduce((acc, val) => {
                  if (!acc[val])
                    acc[val] = {
                      value: val,
                      quantidade: 1,
                    };
                  else acc[val]['quantidade']++;
                  return acc;
                }, {});
                this.labelChart = Object.entries(this.label).map((val) => {
                  return val[1]['value'];
                });
                this.dataChart = Object.entries(this.label).map((val) => {
                  return val[1]['quantidade'];
                });
                console.log(element.name['results']['answer']);
              }
            }
            break;
          }
          default: {
            console.log('sem registro');
            alert('sem registro');
            break;
          }
        } 
      });
    });
  }

  setQuestao(questao, id, type) {
    this.idSurvey = id;
    this.questao = questao;
    this.questionType = type;
  }

  getQuestao() {
    return this.questao;
  }

  clearData() {
    this.data = undefined;
  }
}
