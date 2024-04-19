import { Component, ViewChild, ViewEncapsulation } from '@angular/core'
import { TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs'
import { ListComponent } from './components/list/list.component'
import { SubscribersComponent } from './components/subscribers/subscribers.component'
import { CommonModule } from '@angular/common'
import { NewCampaignComponent } from './components/new-campaign/new-campaign.component'
import { EmailMarketingServiceService } from './service/email-marketing-service.service'
import Swal from 'sweetalert2'
import { AllCampaignComponent } from './components/all-campaign/all-campaign.component'

@Component({
  selector: 'app-email-marketing',
  standalone: true,
  imports: [
    TabsModule,
    ListComponent,
    SubscribersComponent,
    CommonModule,
    NewCampaignComponent,
    AllCampaignComponent,
  ],
  templateUrl: './email-marketing.component.html',
  styleUrl: './email-marketing.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EmailMarketingComponent {
  @ViewChild('tabset') tabset?: TabsetComponent
  public listId: number = 0
  public lists: any
  constructor(public service: EmailMarketingServiceService) {
    this.getAllList()
  }

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
    }
    console.log('object', tab)
    if (tab.heading !== 'Subscribers') {
      this.listId = 0
    }
  }

  getAllList() {
    this.service.GetAllList().subscribe(
      (res) => {
        this.lists = res?.data
      },
      (err) => {
        Swal.fire({
          toast: true,
          text: 'Failed to fetch list',
          animation: false,
          icon: 'error',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      },
    )
  }
}
