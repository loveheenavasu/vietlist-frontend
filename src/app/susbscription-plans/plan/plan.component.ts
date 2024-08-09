import { CommonModule } from '@angular/common'
import { AuthenticationService } from './../../shared/utils/services/authentication.service'
import { Component, Input } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { PlansService } from '../service/plan.service'
import { FullPageLoaderService, Roles, UserStatus } from '@vietlist/shared'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import Swal from 'sweetalert2'
import { SkeletonLoadingComponent } from 'src/app/common-ui/skeleton-loading/skeleton-loading.component'

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule, SkeletonLoadingComponent],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
})
export class PlanComponent {
  @Input() homePageData?: any
  public subscriptionPlainDetail?: any
  public userAlreadyLogin: boolean = false
  public subscriptionPlans: any[] = []
  public planId: any
  public authToken: any
  public isAuthenticated: boolean = false
  public freePlanId: any
  public userDetails: any
  public loader = false
  constructor(
    private subscriptionService: PlansService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private sessionService: AuthenticationService,
    private loaderService: FullPageLoaderService,
    private profileService: ProfileService,
    private fullPageLoader: FullPageLoaderService,
  ) {}

  ngOnInit() {
    this.fetchSubscriptionPlanData()

    this.sessionService.isAuthenticated$.subscribe((res) => {
      this.isAuthenticated = res
    })
    if (this.isAuthenticated) {
      this.fetchProfileDetail()
    }
  }

  public fetchSubscriptionPlanData() {
    this.loaderService.showLoader()
    this.subscriptionService.subscriptionPlan().subscribe({
      next: (res: any) => {
        this.loaderService.hideLoader()
        const plansArray = Object.values(res.data).filter(
          (item) => typeof item === 'object',
        )
        this.subscriptionPlans = plansArray
        this.planId = res.data.id
      },
      error: (err: any) => {},
    })
  }

  getDescriptionItems(data: any) {
    if (data) {
      return data.split(',')
    }
  }

  public getTrustedHTML(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString)
  }

  public handleSignMe() {
    this.router.navigateByUrl('/login')
  }

  navigateToConfirmPayment(id: any) {
    this.freePlanId = id
    if (id === '1') {
      this.handleFreePlan()
    } else {
      console.log(
        this.userDetails?.user_role,
        ' this.userDetails?.user_role !== Roles.businessOwner',
      )
      if (
        !this.isAuthenticated ||
        this.userDetails?.user_role !== Roles.businessOwner
      ) {
        Swal.fire({
          toast: true,
          text: 'You have to register as a Business Owner to purchase a plan',
          animation: false,
          icon: 'error',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        this.router.navigateByUrl('/login')
      } else {
        this.router.navigate(['/confirm-payment', id])
      }
    }
  }

  handleFreePlan() {
    this.loaderService.showLoader()
    const body = {
      level_id: this.freePlanId,
    }
    this.subscriptionService.freePlanSubscription(body).subscribe({
      next: (res) => {
        this.loaderService.hideLoader()
        this.fetchProfileDetail()
        if (res.data?.status == UserStatus.Active) {
          const status = UserStatus.Active
          this.sessionService.setSubscriptonStatus(status)
          this.router.navigateByUrl('/manage-profile')
        } else {
          if (!this.isAuthenticated) {
            this.router.navigateByUrl('/login')
          } else {
            Swal.fire({
              toast: true,
              text: 'You have to register as a Business Owner to purchase plan',
              animation: false,
              icon: 'error',
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            })
          }
        }
      },
      error: (err) => {
        this.loaderService.hideLoader()
        this.router.navigateByUrl('/login')
      },
    })
  }

  public fetchProfileDetail() {
    this.loader = true
    this.profileService.userDetails().subscribe({
      next: (res) => {
        this.loader = false
        this.userDetails = res.data?.user
        console.log(this.userDetails, 'userDetails')
        this.sessionService.userDetails.next(this.userDetails)
        this.sessionService.userDetailResponse.next(this.userDetails)
      },
      error: (err: any) => {
        this.loader = false
      },
    })
  }
}
