import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { FirebaseListObservable, AngularFireDatabase, AngularFire, FirebaseAuthConfig } from 'angularfire2';

import { NativeAudio } from '@ionic-native/native-audio';

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
   usuarios: FirebaseListObservable<any[]>;

   //Variable Global
   nombre:any;
   email:string;
   user:any;

   respuestas:string = "";

  eleccion:string = "";
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
              public vibration: Vibration,
              private nativeAudio: NativeAudio) {

                this.usuarios = angfire.database.list('/Usuarios');

                //console.log("Pregunta" + this.myPreg.preg);
                this.pregunta = angfire.database.list('/preguntas');

                this.registro = this.database.list('/Registros');

               //this.myPreg = new Preguntas();
              this.CargarSonidos();

               this.ObtenerRegistro();

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
        if(this.eleccion == "resp1"){
          this.respuestas = this.respuestas + this.resp1 + "\n"; 
        }
        if(this.eleccion == "resp2"){
          this.respuestas = this.respuestas + this.resp2 + "\n";
        }
        if(this.eleccion == "resp3"){
          this.respuestas = this.respuestas + this.resp3 + "\n";
        }

        if(this.respTrue == this.eleccion){


          var temp=this;
          this.correcto = "CORRECTO";
          this.eleccion = "";
          this.respCorrectas++;
          this.nativeAudio.play('correcto', () => console.log('sonido correcto'));
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
            
          }, 3000);

        }
        else{
          var temp = this;
          this.eleccion = "";
          this.correcto = "INCORRECTO";
          this.nativeAudio.play('incorrecto', () => console.log('sonido incorrecto'));
          try {
            this.vibration.vibrate([300,100,300]);
          } catch (error) {
            console.log("Vibra");
          }
          setTimeout(function(){
            temp.i++;
            if(temp.i <= 2)
              temp.TraerPreguntas(temp.i);

            temp.correcto = "";
            
          }, 3000);

        }

        if(this.i >= 2) {
        
         this.nativeAudio.play('finPartida', () => console.log('Final de Partida'));
         this.GuardarResultado();
        }

  }

  ObtenerRegistro()
  {           

         this.angfire.auth.subscribe(user => {
          if(user) {
            // user logged in
            this.user = user;
          }
          else {
            // user not logged in
            this.user = {};
          }
        });

    console.info(this.user.auth.email);

    var usuario = this.usuarios
    .subscribe(valor => { valor.forEach(v =>{
      if(v.mail == this.user.auth.email)
      {
        console.info("v.nombre" + v.nombre);
        this.nombre = v.nombre;
        console.info("v.nombre1" + this.nombre);
      }
    })

    });
      
  }

  GuardarResultado()
  {
    this.AlertMensaje("Final del Juego!!", "<h2>El juego a terminado, gracias.</h2>");

    if(this.nombre != "")
    {
      this.i = -1;
      console.log("this.nombre2: " + this.nombre);

        this.registro.push({
            nombre: this.nombre ,
            mail: this.user.auth.email,
            respCorrectas: this.respCorrectas,
            respuestas: this.respuestas
            });

    }
    else
      this.AlertMensaje("ERROR!!", "<h2>Problemas al cargar el usuario.</h2>");


    this.respuestas = "";
    this.respCorrectas = 0;
    

  }

  AlertMensaje(titulo: string, mens: string) {

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

   CargarSonidos() {
     console.log("LLego aca..");
      try{
        this.nativeAudio.preloadSimple('correcto', 'assets/mp3/correctoSonido.mp3');

      this.nativeAudio.preloadSimple('incorrecto', 'assets/mp3/incorrectoSonido.mp3');

      this.nativeAudio.preloadSimple('finPartida', 'assets/mp3/finPartida.mp3');
    }
    catch(error)
    {
      console.log("No se cargaron los sonidos!!");
    }
    }


  }



  