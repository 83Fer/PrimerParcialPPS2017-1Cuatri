import { Component } from '@angular/core';

import { InfoPage } from '../info/info';
import { ContactPage } from '../contact/contact';
import { TriviaPage } from '../trivia/trivia';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TriviaPage;
  tab2Root = InfoPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
