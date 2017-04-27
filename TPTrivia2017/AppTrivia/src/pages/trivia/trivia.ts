import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { FirebaseListObservable, AngularFireDatabase, AngularFire } from 'angularfire2';

import { InfoPage } from '../info/info';

import { Vibration } from '@ionic-native/vibration';

import { Preguntas } from '../../clases/Preguntas';



@Component({
  selector: 'page-trivia',
  templateUrl: 'trivia.html'
})
export class TriviaPage {


   pregunta: FirebaseListObservable<any[]>;
 
  eleccion:string;
  correcto:string;
  respCorrectas:string;

  i:number = 0;
  preg: string;
  resp1:string;
  resp2:string;
  resp3:string;
  respTrue:string;

  constructor(public navCtrl: NavController,
              public alertController: AlertController, 
              public database: AngularFireDatabase,
              public angfire: AngularFire, 
              public vibration: Vibration) {

                //console.log("Pregunta" + this.myPreg.preg);
                this.pregunta = angfire.database.list('/preguntas');
               //this.myPreg = new Preguntas();
                this.TraerPreguntas(0);
  }

  TraerPreguntas(i:number)
  {
    var traerPreg = this.angfire.database.list("/preguntas").subscribe(valor => {
      valor.forEach(v =>{
       
      });
      this.preg = valor[i].preg;
      this.resp1 = valor[i].respuestas.resp1;
      this.resp2 = valor[i].respuestas.resp2;
      this.resp3 = valor[i].respuestas.resp3;
      this.respTrue = valor[i].respuestas.respTrue;
    });
    
  }

  Enviar()
  {
    if(this.i < 2)
    {
        if(this.respTrue == this.eleccion)
        {
          var temp=this;
          this.correcto = "CORRECTO";
          try {
            this.vibration.vibrate(500);
          } catch (error) {
            console.log("Vibra");
          }
          setTimeout(function(){  
            temp.i++;
            temp.TraerPreguntas(temp.i);
            temp.correcto = ""; 
            temp.eleccion = ""; 
          }, 3000);
          
        }
        else{
          var temp = this;
          this.correcto = "INCORRECTO";
          try {
            this.vibration.vibrate(1500);
            } catch (error) {
            console.log("Vibra");
            }
          setTimeout(function(){
            temp.i++;
            temp.TraerPreguntas(temp.i);
            temp.correcto = "";
            temp.eleccion = "";
          }, 3000);
          
        }
    }
    else{

    }
    
  }



}
