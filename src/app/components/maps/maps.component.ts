import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})
export class MapsComponent implements OnInit {
  lat = -25.7515124;
  lng = -49.7097205;
  private mylocations = [{}];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    const query = firebase.firestore().collection('answers');
    query.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((x) => {
        this.mylocations.push({
          Id: x.id,
          lat: x.data()['localization']['w_'],
          lng: x.data()['localization']['m_'],
          age: x.data()['age'],
          userName: x.data()['userName'],
          surveyName: x.data()['surveyName'],
          imageUrl: x.data()['imageUrl'],
        });
      });
    });
  }
}
