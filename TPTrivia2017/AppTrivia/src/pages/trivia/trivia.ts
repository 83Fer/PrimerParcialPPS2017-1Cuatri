import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { FirebaseListObservable, AngularFireDatabase, AngularFire } from 'angularfire2';

import { InfoPage } from '../info/info';



@Component({
  selector: 'page-trivia',
  templateUrl: 'trivia.html'
})
export class TriviaPage {


   pregunta: FirebaseListObservable<any>;

   preg:string;

  constructor(public navCtrl: NavController,
              public alertController: AlertController, 
              public database: AngularFireDatabase,
              public angfire: AngularFire) {

                this.pregunta = this.angfire.database.list('/preguntas');

                this.pregunta.subscribe(console.log);

  }

  Enviar()
  {
    this.navCtrl.push(InfoPage);
  }



}
