import { DatePipe } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared'
import { PlansService } from 'src/app/susbscription-plans/service/plan.service'
import Swal from 'sweetalert2'
import { ProfileService } from '../../service/profile.service'

@Component({
  selector: 'app-manage-subscription',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './manage-subscription.component.html',
  styleUrl: './manage-subscription.component.scss',
})
export class ManageSubscriptionComponent {
  public userDetails: any
  public subscriptionDetails: any
  public formattedTimeStamp: any
  constructor(
    private profileDetail: ProfileService,
    private loaderService: FullPageLoaderService,
    private planService: PlansService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

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
      error: (err: any) => { },
    })
  }

  public getUserSubscriptionDetails() {
    this.loaderService.showLoader()
    this.profileDetail.subscriptionDetails().subscribe({
      next: (res) => {
        this.loaderService.hideLoader()
        this.subscriptionDetails = res.data
        this.subscriptionDetails.invoice_detail.forEach((element: any) => {
          element.formattedTimeStamp = element.timestamp.split(' ')[0]
        });
      }, error: (err) => {

      }
    })
  }

  public handleChangePlan() {
    this.router.navigateByUrl('/subscription-plans')
  }

  public cancelMembership(levelId: any) {
    Swal.fire({
      title: 'Do you really want to cancel your membership?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.planService.cancelPlan(levelId).subscribe({
          next: (res) => {
            Swal.fire({
              toast: true,
              text: res.message,
              animation: false,
              icon: 'success',
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            })
            this.authenticationService.setSubscriptonStatus('inactive')
            this.router.navigate(['/'])
          }
        })
      }
    })

  }

  public handleLogout() {
    this.authenticationService.clearAuthentication()
    this.router.navigateByUrl('/')
    window.location.reload()
  }

  public navigateTo(url: any) {
    this.router.navigate([url])
  }
}
