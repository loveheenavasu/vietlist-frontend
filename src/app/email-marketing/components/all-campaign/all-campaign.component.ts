import { status } from './../../helper/index';
import { Component, OnInit } from '@angular/core'
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
  public campaigns: any
  constructor(
    public service: EmailMarketingServiceService,
    private fullPageLoaderService: FullPageLoaderService,
  ) {}

  ngOnInit(): void {
    this.GetAllCampaign()
  }

  GetAllCampaign() {
    this.fullPageLoaderService.showLoader()
    this.service.GetAllCampaign().subscribe({
      next:(res)=>{
        console.log(res , "campaign list")
        this.fullPageLoaderService.hideLoader()
        this.campaigns = res?.data
      },
      error:(err)=>{
        this.fullPageLoaderService.hideLoader()
      }
    })
  }

  updateStatus(id:any,status:any) {
    this.service
      .UpdateCampaignStatus({ id , status })
      .subscribe({
        next: (data) => {
          console.log(data, 'res1')
          console.log(data, 'res1')
          if (data) {
            this.GetAllCampaign()
          }
        },
        error: () => {
          this.fullPageLoaderService.hideLoader()
        },
      })
  }

  // public getResourcesData(tab: any): void {
  //   this.fullPageLoaderService.showLoader()
  //   this.homeservice
  //     .getResources(this.postPerPage, this.currentPage, tab)
  //     .subscribe({
  //       next: (res: any) => {
  //         this.fullPageLoaderService.hideLoader()
  //         this.resourceArr = res.data
  //         this.totalCount = res.total_count
  //       },
  //       error: (err: any) => {
  //         this.fullPageLoaderService.hideLoader()
  //       },
  //     })
  // }

  statusIconName: any = {
    finished: ['circle-check', 'Finished'],
    paused: ['circle-stop', 'Paused'],
  }

  showStatusWithIcon(status: string) {
    return ` <i class="fa-regular fa-${this.statusIconName[status][0]}"></i> ${this.statusIconName[status][1]}`
  }
}
