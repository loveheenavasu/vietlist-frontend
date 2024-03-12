import { BusinessService } from 'src/app/manage-business/service/business.service'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms'
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared'
import { CommonModule, NgIf } from '@angular/common'
import { EventService } from 'src/app/manage-event/service/event.service'


@Component({
  selector: 'app-preview-business',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink , NgIf],
  templateUrl: './preview-business.component.html',
  styleUrl: './preview-business.component.scss',
})
export class PreviewBusinessComponent {
  public postId: any
  public businessFormDetails: any
  public logo: any
  public map: google.maps.Map | null = null // Declare and initialize the map property
  public footerPageContent?: any
  public previewForm: FormGroup
  public latitude!: number
  public longitude!: number
  public userDetails:any;
public hourFilter :any
public eventDetails:any
public eventLocation:any;
public overllRating:any
  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private businessService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
    public router: Router,
    private authService:AuthenticationService,
    private eventService:EventService
  ) {
    this._route.params.subscribe((res) => {
      this.postId = res['id']
    })
    this.previewForm = this.fb.group({
      post_title: new FormControl(''),
      post_content: new FormControl(''),
      business_email: new FormControl(''),
      contact_phone: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      zip: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      post_tags: new FormControl(''),
      street: new FormControl(''),
      website: new FormControl(''),
      mapview: new FormControl(''),
      default_category: new FormControl(''),
      owner_name: new FormControl(''),
      business_historybackground: new FormControl(''),
      mission__vision: new FormControl(''),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      twitter: new FormControl(''),
      region: new FormControl(''),
      special_offers: new FormControl(''),
      consultation_description: new FormControl(''),
      consultation_mode: new FormControl(''),
      consultation_booking_link: new FormControl(''),
      services_list: new FormControl(''),
      price: new FormControl(''),
    })
    // this.previewForm =fb.group({
    //    post_title = new FormControl(''),
    //    post_content = new FormControl(''),
    //    business_email = new FormControl(''),
    //    contact_phone = new FormControl(''),
    //    latitude = new FormControl(''),
    //    longitude = new FormControl(''),
    //    zipcode = new FormControl(''),
    //    state = new FormControl(''),
    //    country = new FormControl('')
    //    city = new FormControl('')
    //    post_tags = new FormControl('')
    //    street = new FormControl('')
    //    website = new FormControl('')
    //    mapview = new FormControl('')
    //    post_category = new FormControl('')
    //    default_category= new FormControl('')
    // })
  }

  ngOnInit() {
    if (this.postId) {
      this.getBusinessFormDetails()
    }
    this.authService.userDetails.subscribe((res: any) => {
      if (res) {
        this.userDetails = res
      }
    })
  }
  dataget: any
  gettags: any

  public getBusinessFormDetails() {
    this.fullPageLoaderService.showLoader()
    this.businessService.getBusiness(this.postId).subscribe({
      next: (res) => {
        this.fullPageLoaderService.hideLoader()
        this.dataget = res?.data || 'NA'
        this.businessFormDetails = res?.data[0]
        this.getEventDetails()
         console.log( this.businessFormDetails,' this.businessFormDetails this.businessFormDetails')
        const business_hours = this.businessFormDetails?.business_hours
       this.hourFilter =  this.getCleanedBusinessHours(business_hours)
        this.previewForm.patchValue(this.businessFormDetails)
        this.logo = res?.data[0]?.logo
        this.latitude = Number(this.businessFormDetails.latitude)
        this.longitude = Number(this.businessFormDetails.longitude)
        this.initMap()
        // this.post_title = this.businessFormDetails.post_title ? this.businessFormDetails.post_title : 'NA',
        // this.post_content = this.businessFormDetails.post_content ? this.businessFormDetails.post_content : 'NA',
        // this.business_email=this.businessFormDetails.business_email ? this.businessFormDetails.business_email : 'NA',
        // this.contact_phone=this.businessFormDetails.contact_phone ? this.businessFormDetails.contact_phone : 'NA',
        // this.website=this.businessFormDetails.website ? this.businessFormDetails.website : 'Na',
        // this.mapview=this.businessFormDetails.mapview ? this.businessFormDetails.mapview : 'NA',
        // this.post_category=this.businessFormDetails.post_category?.map((category: any) => category?.id),
        // this.default_category= this.businessFormDetails.default_category ? this.businessFormDetails.default_category.id : 'NA'

        // this.street = this.businessFormDetails.street;
        // this.latitude = this.businessFormDetails.latitude;
        // this.longitude = this.businessFormDetails.longitude;
        // this.zipcode = this.businessFormDetails.zip;
        // this.state = this.businessFormDetails.region ;
        // this.country = this.businessFormDetails.country;
        // this.city = this.businessFormDetails.city;
        // this.post_tags = this.businessFormDetails.post_tags?.map((tag:any)=>tag.id )
      },
      error: (err) => {},
    })
  }

  public gotToEventDetails(id:any, isGlobal:any){
    this.router.navigate(['/event-details', id], { queryParams: { isGlobal: isGlobal } });
 
   }

  getCleanedBusinessHours(hours:any): string {
    // Remove array braces and commas
     
    return hours

            .replace(/\[|\]/g, '')  // Remove square brackets
            .replace(/,/g, ' ');     // Replace commas with spaces
  }
  public initMap() {
    const mapElement = document.getElementById('map')
    if (mapElement !== null) {
      console.log(this.latitude, this.longitude, 'lng ;at')
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
      console.error('Map element not found.')
    }
  }
  public manageBusiness() {
    this.router.navigateByUrl('/manage-profile/my-business')
  }
  public goToEvent() {
    this.router.navigateByUrl('/manage-profile/manage-events')
  }
  activeTab: string = 'profile';

  setActiveTab(tab: string) {
 
  }


  public getEventDetails() {
    this.fullPageLoaderService.showLoader()
    this.eventService.getEventDetailsByPostId(this.businessFormDetails?.event_id).subscribe({
      next: (res) => {
        console.log(res , "RESPONSE")
        this.fullPageLoaderService.hideLoader()
        ;(this.eventDetails = res?.data[0] || 'NA'),
          (this.eventLocation = this.eventDetails?.street)
        this.overllRating = Number(res.data[0].overall_rating)
        ;(this.latitude = Number(this.eventDetails?.latitude)),
          (this.longitude = Number(this.eventDetails?.longitude))
        this.initMap()
      },
      error: (err:any) => {
        this.fullPageLoaderService.hideLoader()
      },
    })
  }

  public scrollTo(elementId: string): void {
    this.activeTab = elementId;
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
