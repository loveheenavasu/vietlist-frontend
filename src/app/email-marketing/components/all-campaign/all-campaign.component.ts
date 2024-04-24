import { status } from './../../helper/index'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { EmailMarketingServiceService } from '../../service/email-marketing-service.service'
import { CommonModule } from '@angular/common'
import { FullPageLoaderService } from '@vietlist/shared'
@Component({
  selector: 'app-all-campaign',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-campaign.component.html',
  styleUrl: './all-campaign.component.scss',
})
export class AllCampaignComponent implements OnInit {
  @Input() campaigns: any
  @Output() GetAllCampaign = new EventEmitter<any>()
  @Output() navigateToTabs = new EventEmitter<any>()

  constructor(
    public service: EmailMarketingServiceService,
    private fullPageLoaderService: FullPageLoaderService,
  ) {}

  ngOnInit(): void {
    this.GetAllCampaign.emit()
  }

  statusPayload: any = {
    active: 'paused',
    paused: 'active',
  }

  updateStatus(id: any, status: any) {
    this.fullPageLoaderService.showLoader()
    this.service
      .UpdateCampaignStatus({ id, status: this.statusPayload[status] })
      .subscribe({
        next: (data) => {
          this.fullPageLoaderService.hideLoader()
          console.log(data, 'res1')
          console.log(data, 'res1')
          if (data) {
            this.GetAllCampaign.emit()
          }
        },
        error: () => {
          this.fullPageLoaderService.hideLoader()
        },
      })
  }

  navigate(index: any) {
    this.navigateToTabs.emit(index)
  }
  statusIconName: any = {
    finished: ['circle-check', 'Finished'],
    paused: ['circle-stop', 'Paused'],
    active: ['envelope', 'progressing...'],
  }

  getColor(status: string) {
    switch (status) {
      case 'paused':
        return 'text-warning'
        break
      case 'finished':
        return 'text-success'
        break

      default:
        return 'text-muted'
        break
    }
  }

  showStatusWithIcon(status: string) {
    return `<i class="fa-regular fa-${this.statusIconName[status]?.[0]} ${this.getColor(status)} "></i> ${this.statusIconName[status]?.[1]}`
  }
}
