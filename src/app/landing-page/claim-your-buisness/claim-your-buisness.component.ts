import { NgFor } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'app-claim-your-buisness',
  standalone: true,
  imports: [NgFor],
  templateUrl: './claim-your-buisness.component.html',
  styleUrl: './claim-your-buisness.component.scss',
})
export class ClaimYourBuisnessComponent {
  public buisnessFacility = [
    {
      title: 'Boost Your Visibility',
      icon: '/assets/boost.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Own Your Listing',
      icon: '/assets/own-listing.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Increased Credibility',
      icon: '/assets/Increased-Credibility 1.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Get Valuable Insights',
      icon: '/assets/dependable 1.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Promote Special Offers',
      icon: '/assets/promote.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'Customer Engagement',
      icon: '/assets/customer.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
    {
      title: 'SEO Boost',
      icon: '/assets/seo.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },

    {
      title: 'Boost Your Community Support',
      icon: '/assets/community-support.svg',
      description:
        'Get found by thousands of potential customers looking for businesses like yours.',
    },
  ]
}
