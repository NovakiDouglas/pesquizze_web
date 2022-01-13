import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Chart } from '../app/chart.model';
import { FormService } from './components/form/form.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private data: Chart;
  private listAnswer: Chart[];
  private listJson: Chart[];
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

  constructor(
    private router: Router,
    public afs: AngularFirestore,
    private formService: FormService
  ) {}

  setData(data) {
    this.data = data;
  }

  getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  getJsonData(item) {
    const jsonData = [];
    let jsonSubData = [];
    var nameExport;
    this.labelChart = [];
    var questionAux = [];
    var answerAux = [];
    var listResAux = [];
    var listQueAux = [];
    var answerType = [];
    var results = [];
    var answer = [];
    let questions = [];
    //filtro unico
    this.unique = this.a.filter((item, i, ar) => ar.indexOf(item) === i);
    //alert(this.unique);

    this.afs
      .collection<any>('answers', (ref) =>
        ref.where('identifier', '==', item.id)
      )
      .snapshotChanges()
      .subscribe((actionArray) => {
        this.listJson = actionArray.map((item) => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data(),
          } as Chart;
        });
        this.listJson.forEach((el) => {
          var res = [el.result];
          for (let element in res) {
            results.push(JSON.parse(res[element].toString()));
          }
        });
        results.forEach((element) => {
          answer.push(element.results);
        });
        for (let idx = 0; idx < answer.length; idx++) {
          answerAux = [];
          questionAux = [];
          for (
            let index = 0;
            index < Object.values(answer[idx]).length;
            index++
          ) {
            var el = Object.values(answer[idx])[index];

            switch (el['answer_format']['question_type']) {
              case 'SingleChoice': {
                questionAux.push(el['question_title'].replace(/ /g, '_'));
                answerAux.push(el['results']['answer'][0]['text']);
                break;
              }
              case 'Integer': {
                questionAux.push(el['question_title'].replace(/ /g, '_'));
                answerAux.push(el['results']['answer']);
                break;
              }
              case 'Text': {
                questionAux.push(el['question_title'].replace(/ /g, '_'));
                answerAux.push(el['results']['answer']);
                break;
              }
              case 'MultipleChoice': {
                let txt = '';
                el['results']['answer'].forEach((element) => {
                  txt += element['text'] + '--';
                });
                questionAux.push(el['question_title'].replace(/ /g, '_'));
                answerAux.push(txt);
                break;
              }

              default: {
                console.log('sem registro');
                alert('sem registro');
                break;
              }
            }
          }
          listResAux.push(answerAux);
          listQueAux.push(questionAux);
        }
        for (let i = 0; i < listResAux.length; i++) {
          jsonSubData = [];
          for (let x = 0; x < listResAux[i].length; x++) {
            jsonSubData.push({
              question: listQueAux[i][x],
              answer: listResAux[i][x],
            });
          }
          jsonData.push({ answer: jsonSubData });
        }
        questions = questionAux.filter((item, i, ar) => ar.indexOf(item) === i);
        //console.log(Object.values(answer[0]))

        // /console.log(jsonData)
        // question = ["name", "questao 2"]
        if(questions.length > 0){

          this.formService.downloadFile(jsonData, item.nome, questions);
        }else
        alert("sem dados para baixar")
      });
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
      this.typeAnswer(results);
    });
  }

  typeAnswer(results) {
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
        case 'radio-group ': {
          if (
            element.name['answer_format']['question_type'] == 'SingleChoice'
          ) {
            var r = element.name['results'];
            if (r['answer'] == null) {
              this.a.push('N/R');
            } else {
              r['answer'].forEach((element) => {
                console.log(element['text']['answer']);
              });
            }
          }
          break;
        }
        case 'textarea ': {
          if (element.name['answer_format']['question_type'] == 'Text') {
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
        case 'date ': {
          if (
            element.name['answer_format']['date_time_answer_style'] == 'Date'
          ) {
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
        default: {
          console.log('sem registro');
          alert('sem registro');
          break;
        }
      }
    });
  }

  compareType(type, element) {
    switch (type) {
      case 'number': {
        break;
      }
      case 'checkbox-group': {
        break;
      }
      case 'radio-group': {
        break;
      }
      case 'textarea': {
      }
      case 'date': {
        break;
      }
      default: {
        console.log('sem registro');
        alert('sem registro');
        break;
      }
    }
  }

  setQuestao(questao, id, type) {
    this.idSurvey = id;
    this.questao = questao;
    this.questionType = type;
    this.router.navigate(['/chart']);
  }

  getQuestao() {
    return this.questao;
  }

  clearData() {
    this.data = undefined;
  }
}
