import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FullPageLoaderService } from '@vietlist/shared'
import { ProfileService } from '../../service/profile.service'

@Component({
  selector: 'app-manage-subscription',
  standalone: true,
  imports: [],
  templateUrl: './manage-subscription.component.html',
  styleUrl: './manage-subscription.component.scss',
})
export class ManageSubscriptionComponent {
  public userDetails: any
  public subscriptionDetails:any
  public formattedTimeStamp:any
  constructor(
    private profileDetail: ProfileService,
    private loaderService: FullPageLoaderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fetchProfileDetail()
    this.getUserSubscriptionDetails()
  }

  public fetchProfileDetail() {
    this.loaderService.showLoader()
    this.profileDetail.userDetails().subscribe({
      next: (res) => {
        this.loaderService.hideLoader()
        if (res) {
          this.userDetails = res?.data?.user
        }
      },
      error: (err: any) => {},
    })
  }

  public getUserSubscriptionDetails(){
    this.loaderService.showLoader()
    this.profileDetail.subscriptionDetails().subscribe({
      next:(res)=>{
        this.loaderService.hideLoader()
        this.subscriptionDetails = res.data
        this.subscriptionDetails.invoice_detail.forEach((element:any) => {
         element.formattedTimeStamp  = element.timestamp.split(' ')[0]
        });
      },error:(err)=>{

      }
    })
  }

  public handleChangePlan() {
    this.router.navigateByUrl('//subscription-plans')
  }
}
