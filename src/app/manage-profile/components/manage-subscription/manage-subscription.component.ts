import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FullPageLoaderService } from '@vietlist/shared';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-manage-subscription',
  standalone: true,
  imports: [],
  templateUrl: './manage-subscription.component.html',
  styleUrl: './manage-subscription.component.scss'
})
export class ManageSubscriptionComponent {
  public userDetails: any

  constructor(
    private profileDetail: ProfileService,
    private loaderService: FullPageLoaderService,
    private router:Router
  ) {}

  ngOnInit() {
    this.fetchProfileDetail()
  }

  public fetchProfileDetail() {
    this.loaderService.showLoader()
    this.profileDetail.userDetails().subscribe({
      next: (res) => {
        this.loaderService.hideLoader()
        if (res) {
          this.userDetails = res.data.user
          console.log(this.userDetails)
        }
      },
      error: (err: any) => {
       
      },
    })
  }

public handleChangePlan(){
  this.router.navigateByUrl('//subscription-plans')
}

}
