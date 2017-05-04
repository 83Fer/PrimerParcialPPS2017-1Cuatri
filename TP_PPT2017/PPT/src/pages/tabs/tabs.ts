import { Component } from '@angular/core';

import { InfoPage } from '../info/info';
import { ContactPage } from '../contact/contact';
import { PptPage } from '../ppt/ppt';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PptPage;
  tab2Root = InfoPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
