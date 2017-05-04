import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

//Dependencias para usar Firebase
import {AngularFireModule} from 'angularfire2'

import { MyApp } from './app.component';

import { InfoPage } from '../pages/info/info';
import { ContactPage } from '../pages/contact/contact';
import { PptPage } from '../pages/ppt/ppt';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';


//Variable de configuracion firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBCG6dsJ4vgCsX8B5P7vMiMwOiSXwgVUs0",
    authDomain: "pptdb-84745.firebaseapp.com",
    databaseURL: "https://pptdb-84745.firebaseio.com",
    projectId: "pptdb-84745",
    storageBucket: "pptdb-84745.appspot.com",
    messagingSenderId: "689214772720"
}

@NgModule({
  declarations: [
    MyApp,
    InfoPage,
    ContactPage,
    PptPage,
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
    PptPage,
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
