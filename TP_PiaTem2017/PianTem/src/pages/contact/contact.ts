import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  fotoPerfil:string= './assets/img/fotoPerfil.jpg';
mostrar:string;

  constructor(public navCtrl: NavController) {
    this.mostrar = "false";
  }

}
