import { CommonModule } from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Renderer2,
  RendererStyleFlags2,
  ViewChild,
} from '@angular/core'
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared'
import { Subject, firstValueFrom, takeUntil } from 'rxjs'
import { LoaderComponent } from 'src/app/common-ui'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import { PropertyService } from '../property-listings/property.service'
import {
  NgbCarousel,
  NgbCarouselConfig,
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderComponent,
    NgbCarouselModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss',
})
export class PropertyDetailsComponent {
  listing = {
    price: 324999,
    address: '8514 N 46th St, Tampa, FL 33617',
    estPayment: 1959,
    beds: 4,
    baths: 2,
    sqft: 1728,
    features: [
      'Single family residence',
      'Built in 1958',
      '0.60 Acres',
      '1 Attached garage space',
      '$188 price/sqft',
    ],
    description:
      'Welcome to 8514 N 46th... this beautiful home offers a ton of potential, with 1,728 square feet of elegant living space, four spacious bedrooms and two stylish bathrooms. Nestled on a double oversized lot, this property boasts a private pool perfect for cooling off on hot summer days. The backyard is...',
    agent: {
      name: 'Mike Davis',
      imageUrl: '', // Replace with actual image URL
    },
    source: {
      name: 'Stellar MLS',
      mlsId: 'T3530263',
    },
  }
  public propId: any
  public userdetails: any
  public propertyDetails: any
  public isAuthenticated: boolean = false
  public destroy$ = new Subject<void>()
  public map: google.maps.Map | null = null
  public latitude: any
  public longitude: any
  public propertyImages: any[] = []

  @ViewChild('blogSwiper') swiperBlog!: ElementRef
  paused = false
  unpauseOnArrow = false
  pauseOnIndicator = false
  pauseOnHover = false
  pauseOnFocus = false
  isPlaying = true
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel

  public blogSwiperParams = {
    slidesPerView: 1,
    autoplay: {
      delay: 6000,
    },

    on: {
      init() {},
    },
  }

  constructor(
    private authentication: AuthenticationService,
    private homeService: HomepageService,
    private _activatedRoute: ActivatedRoute,
    private loaderService: FullPageLoaderService,
    private router: Router,
    private profile: ProfileService,
    private cd: ChangeDetectorRef,
    public propertyService: PropertyService,
    private carouselConfig: NgbCarouselConfig,
  ) {
    this.isAuthenticated = this.authentication.isAuthenticated()
    this._activatedRoute.params.subscribe((res) => {
      console.log(res, 'response')
      this.propId = res['id']
    })
    // carouselConfig.showNavigationArrows = false
  }

  ngOnInit() {
    if (this.propId) {
      this.getPropertyDetails()
    }
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle()
    } else {
      this.carousel.pause()
    }
    this.paused = !this.paused
  }

  toggleSlideShow(id: string) {
    console.log(id, 'id')
    const imageContainerElements = document.getElementById(id)
    console.log(imageContainerElements, 'imageContainer')
    if (!imageContainerElements) return
    const imageContainer = imageContainerElements as HTMLElement

    this.isPlaying = !this.isPlaying
    if (this.isPlaying) {
      imageContainer.style.animationPlayState = 'running'
      // pauseBtn.textContent = 'Pause';
    } else {
      imageContainer.style.animationPlayState = 'paused'
      // pauseBtn.textContent = 'Play';
    }
    this.togglePaused()
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused()
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused()
    }
  }

  public initMap() {
    const mapElement = document.getElementById('map')
    if (mapElement !== null) {
      this.map = new google.maps.Map(mapElement, {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })

      if (this.latitude && this.longitude) {
        // Add a marker to the map
        const marker = new google.maps.Marker({
          position: {
            lat: this.latitude,
            lng: this.longitude,
          },
          map: this.map,
          title: 'Marker Title',
        })
      }
    } else {
    }
  }

  showSwiper() {
    if (this.propertyImages) {
      if (this.swiperBlog && this.swiperBlog.nativeElement) {
        const swiperEl = this.swiperBlog.nativeElement
        Object.assign(swiperEl, this.blogSwiperParams)
        swiperEl?.initialize()
      }
    }
    this.cd.detectChanges()
  }

  public homestatus: any
  public hometype: any

  getHighResolutionImage(imgArr: any[]) {
    this.propertyImages = imgArr.map((elem) => {
      return elem.mixedSources.jpeg.pop()
    })
  }

  public getPropertyDetails() {
    this.loaderService.showLoader()
    this.propertyService.GetPropertyDetails(this.propId).subscribe({
      // apito get property details with zpid
      // this.profile.getMLSDataById(this.propId).subscribe({  old api to get property details
      next: (res) => {
        if (res) {
          console.log(res, ',bbkbkbkb')
          this.propertyDetails = res?.data
          // this.propertyImages = [res.data[0]?.imgsrc].flat()
          this.getHighResolutionImage(res.data?.photos)
          console.log(this.propertyImages, 'pppppp')
          const data = this.propertyDetails?.homeStatus?.split('_')
          this.homestatus = data?.join(' ')
          const data2 = this.propertyDetails?.homeType?.split('_')
          this.hometype = data2?.join(' ')
          console.log(this.homestatus, this.hometype)
          this.latitude = Number(this.propertyDetails?.latitude)
          this.longitude = Number(this.propertyDetails?.longitude)
          this.loaderService.hideLoader()
          this.cd.detectChanges()
          this.initMap()
        }
      },
      error: (err) => {
        this.loaderService.hideLoader()
      },
    })
  }
  public viewAgentDetails(Id: any) {
    this.router.navigate(['/agent-details', Id])
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
