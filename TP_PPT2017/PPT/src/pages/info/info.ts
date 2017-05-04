import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseListObservable, AngularFireDatabase, AngularFire, FirebaseAuthConfig } from 'angularfire2';


@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

registros:FirebaseListObservable<any[]>; 

  constructor(public navCtrl: NavController,
              public database: AngularFireDatabase,
              public angfire: AngularFire) {

                 this.registros = this.database.list('/Registros');

  }

}
