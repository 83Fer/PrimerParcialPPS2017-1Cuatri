import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, AngularFire, FirebaseAuthConfig } from 'angularfire2';


import { NativeAudio } from '@ionic-native/native-audio';
import { InfoPage } from '../info/info';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-ppt',
  templateUrl: 'ppt.html'
})
export class PptPage {

  usuarios: FirebaseListObservable<any[]>;
  registro: FirebaseListObservable<any[]>;

   //Variable Global
   nombre:any;
   email:string;
   user:any;

   //Variables del juego-->1-piedra, 2-papel, 3-tijera
   cpu:number;

  //fotoDados:string= './assets/img/dados-piedra-papel-tijera.jpg';

  tijera:string = "cut";
  papel:string = "copy";
  piedra:string = "cloudy";
  refrescar:string = "refresh";

  eleccion:string = "refresh";
  partida:string; 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertController: AlertController,
              public database: AngularFireDatabase,
              public angfire: AngularFire,
              public vibration: Vibration,
              private nativeAudio: NativeAudio) {


               this.usuarios = angfire.database.list('/Usuarios');

               this.registro = this.database.list('/Registros');

               this.CargarSonidos();

               this.ObtenerRegistro();
  }//Fin constructor

  //Logica del juego
  Piedra()
  {
        this.cpu= Math.floor((Math.random() * 3) + 1);
        console.log(this.cpu);
        this.MostrarImagenes(this.cpu);

        switch (this.cpu) {
          case 1://Empate
            this.AlertMensaje("Usted ha...", "<h2>Empatado.</h2>");
            this.partida = "Empato";
          break;
          case 2://Perdio
            this.AlertMensaje("Usted ha...", "<h2>Perdido.</h2>");
            this.partida = "Perdio";
          break;
          case 3://Gano
            this.AlertMensaje("Usted ha...", "<h2>Ganado.</h2>");
            this.partida = "Gano";
          break;
          default:
            break;
        }    
        this.FuncionTiempo();
  }

  Papel()
  {
        this.cpu= Math.floor((Math.random() * 3) + 1);
        console.log(this.cpu);
        this.MostrarImagenes(this.cpu);

        switch (this.cpu) {
          case 1://Gano
            this.AlertMensaje("Usted ha...", "<h2>Ganado.</h2>");
            this.partida = "Gano";
          break;
          case 2://Empato
            this.AlertMensaje("Usted ha...", "<h2>Empatado.</h2>");
            this.partida = "Empato";
          break;
          case 3://Perdio
            this.AlertMensaje("Usted ha...", "<h2>Perdido.</h2>");
            this.partida = "Perdio";
          break;
          default:
            break;
        }    
        this.FuncionTiempo();
  }

  Tijera()
  {
        this.cpu= Math.floor((Math.random() * 3) + 1);
        console.log(this.cpu);
        this.MostrarImagenes(this.cpu);

        switch (this.cpu) {
          case 1://Perdio
            this.AlertMensaje("Usted ha...", "<h2>Perdido.</h2>");
            this.partida = "Perdio";
          break;
          case 2://Gano
            this.AlertMensaje("Usted ha...", "<h2>Ganado.</h2>");
            this.partida = "Gano";
          break;
          case 3://Empato
            this.AlertMensaje("Usted ha...", "<h2>Empatado.</h2>");
            this.partida = "Empato";
          break;
          default:
            break;
        }    
        this.FuncionTiempo();
  }

  FuncionTiempo(){
      var temp=this;
      if(this.partida == "Empato"){
          this.eleccion = "";
      
          //this.nativeAudio.play('correcto', () => console.log('sonido correcto'));
          try {
            this.vibration.vibrate(200);
          } catch (error) {
            console.log("Vibra");
          }
          setTimeout(function(){
              temp.GuardarResultado();
            
          }, 3000);
      }
      if(this.partida == "Gano"){
          this.eleccion = "";
      
          this.nativeAudio.play('correcto', () => console.log('sonido correcto'));
          try {
            this.vibration.vibrate(500);
          } catch (error) {
            console.log("Vibra");
          }
          setTimeout(function(){
              temp.GuardarResultado();
            
          }, 3000);
      }
      if(this.partida == "Perdio"){
          this.eleccion = "";
      
          this.nativeAudio.play('incorrecto', () => console.log('sonido incorrecto'));
          try {
            this.vibration.vibrate([300,100,300]);
          } catch (error) {
            console.log("Vibra");
          }
          setTimeout(function(){
              temp.GuardarResultado();
            
          }, 3000);
      }
          
  }

  MostrarImagenes(randomCpu:number){
    var cpu:string;
    switch (randomCpu) {
      case 1:
         cpu = this.piedra;
        break;
        case 2:
          cpu = this.papel;
        break;
        case 3:
          cpu = this.tijera;
        break;
    
      default:
        break;
    }

    // var temp:this;
    // temp.eleccion= "cloudy";
    //           console.log("LLega Mostrar1");
    // setInterval(function(){
    //           temp.eleccion= "copy";
    //           console.log("LLega Mostrar2");
    //       }, 2000);
    //       setInterval(function(){
    //           temp.eleccion= "cut";
    //           console.log("LLega Mostrar3");
    //       }, 2000);
    //       setInterval(function(){
    //           temp.eleccion= cpu;
    //           console.log("LLega Resultado");
    //       }, 2000);
          this.eleccion = cpu;
  }
 
  CargarSonidos() {

      console.log("LLego aca..");
        try{
          this.nativeAudio.preloadSimple('correcto', 'assets/mp3/correctoSonido.mp3');

        this.nativeAudio.preloadSimple('incorrecto', 'assets/mp3/incorrectoSonido.mp3');

      }
      catch(error)
      {
        console.log("No se cargaron los sonidos!!");
      }
  }

  ObtenerRegistro(){

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
    
    if(this.nombre != "")
    {
      var temp = this;
      this.eleccion = this.refrescar;
      var hoy = new Date();
      var dd = hoy.getDate();
      var mm = hoy.getMonth()+1; 
      var yyyy = hoy.getFullYear();
      var fecha:string;

      if(dd<10) {
        fecha ='0'+ dd + "/"
      } 
      else
        fecha = dd + "/"
      if(mm<10) {
        fecha= fecha + '0' + mm + "/"
      } 
      else
        fecha = fecha + mm + "/"

      fecha = fecha + yyyy;

      console.log("this.nombre2: " + this.nombre);

        this.registro.push({
            nombre: this.nombre ,
            mail: this.user.auth.email,
            fecha: fecha,
            partida: this.partida
          });
          
           

    }  

    this.eleccion = this.refrescar;
    
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


}//fin class
