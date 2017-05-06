import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { File } from '@ionic-native/file';

import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-piano',
  templateUrl: 'piano.html'
})
export class PianoPage {
  //Variables del juego
  textMusica: string= "";
  grabar: string = "false";
  valor:string = "";

  mostrar:string = "elige";

  constructor(public navCtrl: NavController,
              public vibration: Vibration,
              private nativeAudio: NativeAudio,
              private file: File) {

    this.CargarSonidos();

  }

  Graba(){
    if(this.grabar == "true"){
      console.log("graba");
      this.textMusica = this.textMusica + this.valor;
    }
    if(this.grabar == "false"){

      console.log("No graba");

      if(this.textMusica != ""){
          this.GuardarArchivo();

          this.textMusica = "";
      }
      
    }
  }

  

  GuardarArchivo(){
    var cordova: any;
    try{

    
          this.file.createFile(cordova.file.dataDirectory , "piano.txt", true)
          .then(function(response){
              alert("Llego a escribir:" + response);
              this.file.writeFile(cordova.file.dataDirectory , "piano.txt", this.textMusica, true)
              .then(function(response){
                alert("Llego a escribir1:" + response);
                this.file.readAsText(cordova.file.dataDirectory, "piano.txt")
                .then(function(response){
                  alert("Se leyo bien:" + response);
                },(error)=>{
                  alert("NO llego" +response );
                });
              },(error)=>{
                alert("NO llego" +response);
              });
          },(error)=>{
            alert("NO llego");
          });
    
    }catch(error){
        alert("ERROR");
      }
    
  }

  LeerArchivo(){
    var cordova:any;
    try {
      this.file.checkFile(cordova.file.dataDirectory, "piano.txt");
    } catch (error) {
      
    }
  }

  CargarSonidos() {

      console.log("LLego aca..");
        try{
          
        this.nativeAudio.preloadSimple('sevaaponerfeo', 'assets/mp3/homero13.mp3');
        this.nativeAudio.preloadSimple('demediez', 'assets/mp3/homero22.mp3');
        this.nativeAudio.preloadSimple('donbarredora', 'assets/mp3/homero23.mp3');
        this.nativeAudio.preloadSimple('matanga', 'assets/mp3/homero27.mp3');
        this.nativeAudio.preloadSimple('prestasdinero', 'assets/mp3/homero28.mp3');
        this.nativeAudio.preloadSimple('quierounarosca', 'assets/mp3/homero29.mp3');

      }
      catch(error)
      {
        console.log("No se cargaron los sonidos!!");
      }
  }

  BotonUno(){
    var temp=this;
    this.mostrar="";
     this.nativeAudio.play('donbarredora', () => console.log('sonido correcto'));
          try {
            this.vibration.vibrate(500);
          } catch (error) {
            console.log("Vibra");
          }

          this.Graba();

          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 5000);
  }

  BotonDos(){
    var temp=this;
    this.mostrar="";
     this.nativeAudio.play('matanga', () => console.log('sonido correcto'));
          try {
            this.vibration.vibrate(500);
          } catch (error) {
            console.log("Vibra");
          }

          this.Graba();

          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 2000);
  }

  BotonTres(){
    var temp=this;
    this.mostrar="";
     this.nativeAudio.play('prestasdinero', () => console.log('sonido correcto'));
          try {
            this.vibration.vibrate(500);
          } catch (error) {
            console.log("Vibra");
          }

          this.Graba();

          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 9000);
  }

  BotonCuatro(){
    var temp=this;
    this.mostrar="";
     this.nativeAudio.play('demediez', () => console.log('sonido correcto'));
          try {
            this.vibration.vibrate(500);
          } catch (error) {
            console.log("Vibra");
          }

          this.Graba();

          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 4000);
  }

  BotonCinco(){
    var temp=this;
    this.mostrar="";
     this.nativeAudio.play('sevaaponerfeo', () => console.log('sonido correcto'));
          try {
            this.vibration.vibrate(500);
          } catch (error) {
            console.log("Vibra");
          }

          this.Graba();

          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 2000);
  }

  BotonSeis(){
    var temp=this;
    this.mostrar="";
     this.nativeAudio.play('quierounarosca', () => console.log('sonido correcto'));
          try {
            this.vibration.vibrate(500);
          } catch (error) {
            console.log("Vibra");
          }

          this.Graba();

          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 9000);
  }

}
