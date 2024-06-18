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
@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LoaderComponent],
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
      '$188 price/sqft'
    ],
    description: 'Welcome to 8514 N 46th... this beautiful home offers a ton of potential, with 1,728 square feet of elegant living space, four spacious bedrooms and two stylish bathrooms. Nestled on a double oversized lot, this property boasts a private pool perfect for cooling off on hot summer days. The backyard is...',
    agent: {
      name: 'Mike Davis',
      imageUrl: '' // Replace with actual image URL
    },
    source: {
      name: 'Stellar MLS',
      mlsId: 'T3530263'
    }
  };
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
  ) {
    this.isAuthenticated = this.authentication.isAuthenticated()
    this._activatedRoute.params.subscribe((res) => {
      console.log(res, 'response')
      this.propId = res['id']
    })
  }

  ngOnInit() {
    if (this.propId) {
      this.getPropertyDetails()
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
  public getPropertyDetails() {
    this.loaderService.showLoader()
    this.propertyService.GetPropertyDetails(this.propId).subscribe({
      // apito get property details with zpid
      // this.profile.getMLSDataById(this.propId).subscribe({  old api to get property details
      next: (res) => {
        if (res) {
          console.log(res)
          this.propertyDetails = res?.data
          // this.propertyImages = [res.data[0]?.imgsrc].flat()
          this.propertyImages = res.data.big
          console.log(this.propertyImages , "pppppp")
          const data = this.propertyDetails?.homeStatus?.split('_')
          this.homestatus = data?.join(' ')
          const data2 = this.propertyDetails?.homeType?.split('_')
          this.hometype = data2?.join(' ')
          console.log(this.homestatus , this.hometype)
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
