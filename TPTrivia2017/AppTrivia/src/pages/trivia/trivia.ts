import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { FirebaseListObservable, AngularFireDatabase, AngularFire } from 'angularfire2';

import { InfoPage } from '../info/info';

import { Preguntas } from '../../clases/Preguntas';



@Component({
  selector: 'page-trivia',
  templateUrl: 'trivia.html'
})
export class TriviaPage {


   pregunta: FirebaseListObservable<any[]>;

   private myPreg: Preguntas;
resp1:string;

  constructor(public navCtrl: NavController,
              public alertController: AlertController, 
              public database: AngularFireDatabase,
              public angfire: AngularFire) {

                //console.log("Pregunta" + this.myPreg.preg);
                this.pregunta = angfire.database.list('/preguntas');
               this.myPreg = new Preguntas();
                this.TraerPreguntas();
                console.log("Aca 2 " + this.myPreg.preg);

  }

  TraerPreguntas()
  {
    var traerPreg = this.angfire.database.list("/preguntas").subscribe(valor => {
      valor.forEach(v =>{
       this.myPreg.preg = v.preg;
       this.myPreg.respuestas = v.respuestas.resp1;
        console.log(valor[0].preg);
      });
      console.log("Aca:" + valor[1].preg);
      console.log("Aca 1:" + this.myPreg.preg);
      console.log("Aca 3:" + this.myPreg.respuestas);
      this.resp1 = valor[1].respuestas.resp1;
      console.log("Aca 4:" + this.resp1);
    });
    //Aca llega la variable vacia
    console.log("Hola" + this.myPreg.preg);
  }

  Enviar()
  {
    this.navCtrl.push(InfoPage);
  }



}
