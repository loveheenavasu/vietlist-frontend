import { NavigationEnd, Router } from '@angular/router'
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
import { NgOptimizedImage } from '@angular/common'

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
    NgOptimizedImage,
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
  public adDetails: any;
  public showAdInTop: any
  currentIndex: number = 0;

  constructor(
    private router: Router,
    private homePageContent: HomepageService,
  ) {
    this.getHomePageContent()
    // this.subscribeToRouterEvents()
  }

  ngOnInit() {
    this.getHomePageContent()
    this.subscribeToRouterEvents()
    this.showAdDataFetch()
  }

  public showAdDataFetch() {
    this.homePageContent.showAD().subscribe({
      next: (res: any) => {
        console.log("check show ad", res)
        this.adDetails = res.data
        this.showAdHomePageTop()
        console.log("check the ads array", this.adDetails)
      }
    })
  }

  public showAdHomePageTop() {
    this.adDetails.map((data: any) => {
      if (data.Page_key == 'Home Top') {
        this.showAdInTop = data.ads_detail
        console.log("check top ad", this.showAdInTop)
      }
    })
  }


  private subscribeToRouterEvents(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/' || event.url === '/home') {
          window.location.reload()
        }
      }
    })
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
