import { BusinessService } from 'src/app/manage-business/service/business.service'
import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms'
import { FullPageLoaderService } from '@vietlist/shared'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-preview-business',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './preview-business.component.html',
  styleUrl: './preview-business.component.scss',
})
export class PreviewBusinessComponent {
  public postId: any
  public businessFormDetails: any
  logo: any
  public previewForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private businessService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
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
  }
  dataget: any
  gettags: any
  public getBusinessFormDetails() {
    this.fullPageLoaderService.showLoader()
    this.businessService.getBusiness(this.postId).subscribe({
      next: (res) => {
        this.fullPageLoaderService.hideLoader()

        this.dataget = res?.data
        this.businessFormDetails = res?.data[0]
        this.previewForm.patchValue(this.businessFormDetails)
        this.logo = res?.data[0]?.logo
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
}
