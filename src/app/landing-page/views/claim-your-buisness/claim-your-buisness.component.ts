import { NgFor } from '@angular/common'
import { Component, HostListener, Input } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService, Roles } from '@vietlist/shared'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-claim-your-buisness',
  standalone: true,
  imports: [NgFor],
  templateUrl: './claim-your-buisness.component.html',
  styleUrl: './claim-your-buisness.component.scss',
})
export class ClaimYourBuisnessComponent {
  @Input() homePageData?: any
  public isAuthentecate?: boolean
  public userRole: string = ''
  public subscriptionStatus: boolean = false

  constructor(
    private router: Router,
    private sessionService: AuthenticationService,
  ) {
    this.sessionService.userRole.subscribe((res) => {
      this.userRole = res
    })
    this.sessionService.isSubscription$.subscribe((res) => {
      this.subscriptionStatus = res
      // console.log("check the subscription status", this.subscriptionStatus)
    })
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Adjust content layout based on the window size
  }

  ngOnInit() {}

  public buisnessFacility = [
    {
      title: 'Boost Your Visibility',
      icon: '/assets/image/boost.png',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Own Your Listing',
      icon: '/assets/image/own-listing.png',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Increased Credibility',
      icon: '/assets/image/Increased-Credibility 1.png',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Get Valuable Insights',
      icon: '/assets/image/dependable 1.png',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Promote Special Offers',
      icon: '/assets/image/promote.png',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Customer Engagement',
      icon: '/assets/image/customer.png',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'SEO Boost',
      icon: '/assets/image/seo.png',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },

    {
      title: 'Community Support',
      icon: '/assets/image/community-support.png',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
  ]

  public claimBusinessLisit() {
    this.router.navigateByUrl('/business-listing')
  }

  public goToAddBusiness() {
    console.log('check ---->', Roles.subscriber)
    if (this.userRole == Roles.subscriber) {
      console.log('check1 ---->')
      this.router.navigateByUrl('/register')
    } else if (
      this.userRole == Roles.businessOwner &&
      !this.subscriptionStatus
    ) {
      // console.log("check2")
      console.log('check2 ---->')
      Swal.fire({
        toast: true,
        text: 'Please choose plan',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
      })
      this.router.navigateByUrl('/subscription-plans')
    } else if (
      this.userRole == Roles.businessOwner &&
      this.subscriptionStatus
    ) {
      console.log('check3 ---->')
      this.router.navigateByUrl('/list-business')
    } else if (!this.userRole) {
      console.log('check3 ---->')

      this.router.navigateByUrl('/login')
    }
  }
}
