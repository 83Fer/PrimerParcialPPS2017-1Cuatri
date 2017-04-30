import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

//Dependencias para usar Firebase
import {AngularFireModule} from 'angularfire2'


import { MyApp } from './app.component';

import { InfoPage } from '../pages/info/info';
import { ContactPage } from '../pages/contact/contact';
import { TriviaPage } from '../pages/trivia/trivia';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';

//Variable de configuracion firebase
export const firebaseConfig = {
  apiKey: "AIzaSyD9IjBzIQR-Z_q_jIs-qIP_PcCZY89fTt4",
    authDomain: "triviadb-a0e25.firebaseapp.com",
    databaseURL: "https://triviadb-a0e25.firebaseio.com",
    projectId: "triviadb-a0e25",
    storageBucket: "triviadb-a0e25.appspot.com",
    messagingSenderId: "923926838804"
}


@NgModule({
  declarations: [
    MyApp,
    InfoPage,
    ContactPage,
    TriviaPage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)//Añadimos la importacion del firebase
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InfoPage,
    ContactPage,
    TriviaPage,
    TabsPage, 
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
