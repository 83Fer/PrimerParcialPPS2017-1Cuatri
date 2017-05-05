import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-piano',
  templateUrl: 'piano.html'
})
export class PianoPage {

  mostrar:string = "elige";

  constructor(public navCtrl: NavController,
              public vibration: Vibration,
              private nativeAudio: NativeAudio) {

    this.CargarSonidos();

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
     this.nativeAudio.play('darthVader', () => console.log('sonido correcto'));
          try {
            this.vibration.vibrate(500);
          } catch (error) {
            console.log("Vibra");
          }

          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 3000);
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
          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 3000);
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
          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 3000);
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
          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 3000);
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
          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 3000);
  }

  BotonSeis(){
    var temp=this;
    this.mostrar="";
     this.nativeAudio.play('homeroRosca', () => console.log('sonido correcto'));
          try {
            this.vibration.vibrate(500);
          } catch (error) {
            console.log("Vibra");
          }
          setTimeout(function(){
            temp.mostrar="elige";
            
          }, 3000);
  }

}
