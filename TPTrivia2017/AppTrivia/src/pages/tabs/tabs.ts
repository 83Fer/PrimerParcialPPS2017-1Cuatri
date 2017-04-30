import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InfoPage } from '../info/info';
import { ContactPage } from '../contact/contact';
import { TriviaPage } from '../trivia/trivia';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  email: string;
  email2: string;
  respCorrectas: string;

  i:number = 0;

  tab1Root = TriviaPage;
  tab2Root = InfoPage;
  tab3Root = ContactPage;

  constructor( public navCtrl: NavController,  private navParams: NavParams) {
    // let email = navParams.get('email');
    // let resp = navParams.get('respCorrectas');
    // this.email = email;
    // this.respCorrectas = resp;
    // console.log(email);

    // this.i ++;
    // this.SubirResultado(this.i);
    // this.navCtrl.push(TriviaPage, {
    //   email:this.email
    // });
  }

  
  
}
