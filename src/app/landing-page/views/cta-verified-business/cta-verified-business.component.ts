import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-cta-verified-business',
  standalone: true,
  imports: [],
  templateUrl: './cta-verified-business.component.html',
  styleUrl: './cta-verified-business.component.scss',
})
export class CtaVerifiedBusinessComponent {
  @Input() homePageData?: any
  public ctaContent?: any

  constructor() {}

  ngOnInit() {
    this.ctaContent = this.homePageData
  }

  public verifiedImage: {
    image: string
    verified_logo: string
  }[] = [
    {
      image: '/assets/image/cta-verified-img1.svg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image: '/assets/image/cta-verified-img1.svg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image: '/assets/image/cta-verified-img1.svg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image: '/assets/image/cta-verified-img1.svg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
    {
      image: '/assets/image/cta-verified-img1.svg',
      verified_logo: '/assets/image/cta-verfied-img2.svg',
    },
  ]
}
