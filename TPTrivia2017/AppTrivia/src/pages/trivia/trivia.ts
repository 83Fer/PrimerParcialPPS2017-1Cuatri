import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { FirebaseListObservable, AngularFireDatabase, AngularFire } from 'angularfire2';

import { InfoPage } from '../info/info';

import { TabsPage } from '../tabs/tabs';

import { Vibration } from '@ionic-native/vibration';

import { Preguntas } from '../../clases/Preguntas';



@Component({
  selector: 'page-trivia',
  templateUrl: 'trivia.html'
})
export class TriviaPage {
   //Variables para el FireBase
   registro: FirebaseListObservable<any[]>;
   pregunta: FirebaseListObservable<any[]>;

   //Variable Global
   email: string;
 
  eleccion:string;
  correcto:string;
  respCorrectas:number = 0;

  i:number = 0;
  preg: string;
  resp1:string;
  resp2:string;
  resp3:string;
  respTrue:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertController: AlertController, 
              public database: AngularFireDatabase,
              public angfire: AngularFire, 
              public vibration: Vibration) {

                let email = navParams.get('email');
                this.email = email;

                //console.log("Pregunta" + this.myPreg.preg);
                this.pregunta = angfire.database.list('/preguntas');

                this.registro = this.database.list('/Registros');
               
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
            if(temp.i <= 2)
              temp.TraerPreguntas(temp.i);

            temp.correcto = ""; 
            temp.eleccion = "";
            temp.respCorrectas++; 
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
            if(temp.i <= 2)
              temp.TraerPreguntas(temp.i);
           
            temp.correcto = "";
            temp.eleccion = "";
          }, 3000);
          
        }

        if(this.i >= 2)
        {
         this.AlertMensaje("Final del Juego!!", "<h2>El juego a terminado, gracias.</h2>");
         this.i = 0;

         this.navCtrl.push(TabsPage, {
           email: "",
           respCorrectas : this.respCorrectas
         }); 
          // this.registro.push({
          //   nombre: this.usuario,
          //   mail: this.mail,
          //   respCorrectas: ""
          //   });
        }
    
  }

  AlertMensaje(titulo: string, mens: string)
  {
    
      let ventana = this.alertController.create({
      title: titulo,
      message: mens,
      buttons:[
        {
          text: "Aceptar",
          handler: data => {
            console.log('Mensaje de Alerta');
            }
          }
        ]

      });
      ventana.present(ventana);
    }



}
