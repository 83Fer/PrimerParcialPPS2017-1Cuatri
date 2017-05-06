import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { File } from '@ionic-native/file';
//Dependencias para usar Firebase
import {AngularFireModule} from 'angularfire2'

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { ContactPage } from '../pages/contact/contact';
import { PianoPage } from '../pages/piano/piano';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';

//Variable de configuracion firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBpqpDpOGiz1bR5Jy6i9BKnghGRSrP3EAY",
    authDomain: "piantemdb.firebaseapp.com",
    databaseURL: "https://piantemdb.firebaseio.com",
    projectId: "piantemdb",
    storageBucket: "piantemdb.appspot.com",
    messagingSenderId: "554611898500"
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ContactPage,
    PianoPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)//Añadimos la importacion del firebase
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ContactPage,
    PianoPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    NativeAudio,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
