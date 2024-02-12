import { Router } from '@angular/router'
import { PlanComponent } from './../susbscription-plans/index'
import { CardSwiperComponent } from './../common-ui/swipers/components/card-swiper'
import { Component } from '@angular/core'
import {
  BuisnessCategoryComponent,
  ClaimYourBuisnessComponent,
  BlogNewsComponent,
  ExplainingPlatformComponent,
  TestimonialsComponent,
  EventsComponent,
  CtaVerifiedBusinessComponent,
} from './views'
import { TrendingServicesComponent } from './views/trending-services/trending-services.component'
import { HomepageService } from './views/service/homepage.service'

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BuisnessCategoryComponent,
    ClaimYourBuisnessComponent,
    BlogNewsComponent,
    TestimonialsComponent,
    ExplainingPlatformComponent,
    CardSwiperComponent,
    EventsComponent,
    PlanComponent,
    TrendingServicesComponent,
    CtaVerifiedBusinessComponent,
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class HomepageComponent {
  logos: string[] = [
    'logo1.png',
    'logo2.png',
    'logo3.png',
    // Add more logo URLs as needed
  ]
  homePageData?: any
  currentLogoIndex = 0

  constructor(
    private router: Router,
    private homePageContent: HomepageService,
  ) {
    this.getHomePageContent()
  }

  ngOnInit() {
    this.getHomePageContent()
  }

  public getHomePageContent() {
    this.homePageContent.homePageContent().subscribe({
      next: (res: any) => {
        this.homePageData = res.data
      },
    })
  }

  nextLogo() {
    this.currentLogoIndex = (this.currentLogoIndex + 1) % this.logos.length
    console.log(this.currentLogoIndex)
  }

  prevLogo() {
    this.currentLogoIndex =
      (this.currentLogoIndex - 1 + this.logos.length) % this.logos.length
  }

  public findBusiness() {
    this.router.navigateByUrl('/find-business')
  }

  public listBusiness() {
    this.router.navigateByUrl('/benefits-of-joining')
  }
}
