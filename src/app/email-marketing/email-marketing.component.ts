import { Component, ViewChild, ViewEncapsulation } from '@angular/core'
import { TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs'
import { ListComponent } from './components/list/list.component'
import { SubscribersComponent } from './components/subscribers/subscribers.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-email-marketing',
  standalone: true,
  imports: [TabsModule, ListComponent, SubscribersComponent, CommonModule],
  templateUrl: './email-marketing.component.html',
  styleUrl: './email-marketing.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EmailMarketingComponent {
  @ViewChild('tabset') tabset?: TabsetComponent
  public listId: number = 0
  constructor() {}

  navigateToTabs(tabIndex: any) {
    if (this.tabset) {
      this.tabset.tabs[tabIndex].active = true
    }
  }

  setListId(id: any) {
    this.listId = id
  }

  removeListId(tab: any) {
    if (this.tabset) {
      console.log(this.tabset.tabs[3]?.active, 'tabset.tabs[3]?.active')
    }
    console.log('object', tab)
    if (tab.heading !== 'Subscribers') {
      this.listId = 0
    }
  }
}
