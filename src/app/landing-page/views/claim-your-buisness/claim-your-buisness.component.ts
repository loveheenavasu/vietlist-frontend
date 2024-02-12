import { NgFor } from '@angular/common'
import { Component, HostListener, Input } from '@angular/core'

@Component({
  selector: 'app-claim-your-buisness',
  standalone: true,
  imports: [NgFor],
  templateUrl: './claim-your-buisness.component.html',
  styleUrl: './claim-your-buisness.component.scss',
})
export class ClaimYourBuisnessComponent {
  @Input() homePageData?: any

  public claimBusinessHeaderContent?: any
  constructor() { }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Adjust content layout based on the window size
  }

  ngOnInit() {
    this.claimBusinessHeaderContent = this.homePageData
  }

  public buisnessFacility = [
    {
      title: 'Boost Your Visibility',
      icon: '/assets/icons/boost.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Own Your Listing',
      icon: '/assets/icons/own-listing.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Increased Credibility',
      icon: '/assets/icons/Increased-Credibility 1.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Get Valuable Insights',
      icon: '/assets/icons/dependable 1.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Promote Special Offers',
      icon: '/assets/icons/promote.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Customer Engagement',
      icon: '/assets/icons/customer.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'SEO Boost',
      icon: '/assets/icons/seo.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },

    {
      title: 'Community Support',
      icon: '/assets/icons/community-support.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
  ]

}
