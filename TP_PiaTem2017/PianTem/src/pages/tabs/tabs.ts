import { Component } from '@angular/core';


import { ContactPage } from '../contact/contact';
import { PianoPage } from '../piano/piano';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PianoPage;
  
  tab3Root = ContactPage;

  constructor() {

  }
}
