import { LoaderComponent } from 'src/app/common-ui'
import { CommonModule } from '@angular/common'
import { AuthenticationService } from './../../shared/utils/services/authentication.service'
import { Component, Input } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { PlansService } from '../service/plan.service'
import { FullPageLoaderService, UserStatus } from '@vietlist/shared'

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule],
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
  public planHeaderContent?: any
  public freePlanId: any
  constructor(
    private subscriptionService: PlansService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private sessionService: AuthenticationService,
    private loaderService: FullPageLoaderService,
  ) {}

  ngOnInit() {
    this.fetchSubscriptionPlanData()
    this.planHeaderContent = this.homePageData
    this.sessionService.isAuthenticated$.subscribe((res) => {
      this.isAuthenticated = res
    })
  }

  public fetchSubscriptionPlanData() {
    this.loaderService.showLoader()
    this.subscriptionService.subscriptionPlan().subscribe({
      next: (res: any) => {
        console.log('check subscription data', res)
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
    console.log(typeof id, 'planId')
    this.freePlanId = id
    if (id == '1') {
      this.handleFreePlan()
    } else {
      this.router.navigate(['/confirm-payment', id])
      if (!this.isAuthenticated) {
        this.router.navigateByUrl('/login')
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
        console.log(res)
        if (res.data?.status == UserStatus.Active) {
          const status = UserStatus.Active
          this.sessionService.setSubscriptonStatus(status)
          this.router.navigateByUrl('/manage-profile')
        }
      },
    })
  }
}
