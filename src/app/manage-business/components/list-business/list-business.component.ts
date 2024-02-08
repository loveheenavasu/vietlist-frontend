import { RouterOutlet } from '@angular/router'
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common'
import {
  BusinessCategoryResponse,
  TagsResponse,
} from './../../service/business.interface'
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { MatCardModule } from '@angular/material/card'
import { ChangeDetectorRef, Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatStepperModule } from '@angular/material/stepper'
import { SubscriptionFormComponent } from '../subscription-form/subscription-form.component'
import { BusinessBioComponent } from '../business-bio/business-bio.component'
import { ConsultationFormComponent } from '../consultation-form/consultation-form.component'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { NgSelectModule } from '@ng-select/ng-select'
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg'
import { BusinessService } from '../../service/business.service'
import { LocalStorageService } from '@vietlist/shared'
import Swal from 'sweetalert2'
import { PromotionsFormComponent } from '../promotions-form/promotions-form.component'
import { LoaderComponent } from 'src/app/common-ui'
import { NgxDropzoneModule } from 'ngx-dropzone'

@Component({
  selector: 'app-list-business',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    SubscriptionFormComponent,
    BusinessBioComponent,
    ConsultationFormComponent,
    PromotionsFormComponent,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteComponent,
    NgSelectModule,
    NgxIntlTelInputModule,
    NgClass,
    NgFor,
    NgIf,
    RouterOutlet,
    LoaderComponent,
    NgxDropzoneModule,
    JsonPipe
  ],
  templateUrl: './list-business.component.html',
  styleUrl: './list-business.component.scss',
})
export class ListBusinessComponent {
  public isloader: boolean = false
  public latitude!: any
  public longitude!: any
  public separateDialCode = true
  public isFirstStepCompleted: boolean = false
  public SearchCountryField = SearchCountryField
  public CountryISO = CountryISO
  public PhoneNumberFormat = PhoneNumberFormat
  public preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ]
  public categoriesValue: any
  public post_category: BusinessCategoryResponse[] = []
  public post_tags :any[] = []
  public isEditable = false
  public businessInfoForm!: FormGroup
  public firstFormGroup!: FormGroup
  public secondFormGroup!: FormGroup
  public postId: any
  public businessFormDetails: any
  public selectedDefaultCategories: any[] = []
  public selected0defaultCat: any
  public addBusinessFormData: any
  public isSubscriptionStepper: boolean = false
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public localStoragePostId: any
  public isFormFilled :boolean = false
  public filesString: any
  public files: File[]=[]
  public fullAddress : any
  public imageName:any
  public uploadMediaUrl:any
  public isFilesPresent: boolean = false;
  public display: any
  public zoom = 6
  public selectedTagsString = ''
  public street = ''
  public tags:any[]=[]

  /**
   *
   * @param _formBuilder
   * @param businessService
   * @param localStorageService
   */

  constructor(
    private _formBuilder: FormBuilder,
    private businessService: BusinessService,
    private localStorageService: LocalStorageService,
  ) {
    this.businessInfoForm = this._formBuilder.group({
      post_title: ['', Validators.required],
      contact_phone: ['', Validators.required],
      business_email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      post_category: ['', Validators.required],
      default_category: ['', Validators.required],
      post_content: ['', Validators.required],
      website: [''],
      mapview: ['']
    })
     this.businessService.storePostId.subscribe((res)=>{
      this.postId = res
    })
    const id = localStorageService.getData('postId')
    this.postId = Number(id)
    
    const postId = localStorageService.getData('postId')
    this.localStoragePostId = Number(postId)

    
    this.businessService.storePostId.subscribe((res)=>{
      this.localStoragePostId = res
    })
    

    this.businessService.isBusinessFormFilled.subscribe((res)=>{
      this.isFormFilled = res
    })

    const localFlag = this.localStorageService.getData("isBusinessFormFilled")
    this.isFormFilled = Boolean(localFlag)

  }

  ngOnInit() {
    this.getBusinessCat()
    this.getTags()
    this.initMap()
    if(this.postId){
      this.getBusinessFormDetails(this.postId)
    }
   
  }


  public onSelect(event: any) {
  
    if (event.addedFiles.length > 1) {
      Swal.fire({
        toast: true,
        text: 'You can only upload one file.',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      
    } else {
      this.files.push(...event.addedFiles);
      this.filesString = this.files.map((file) => file.name).join(', ');
      this.isFilesPresent = true;
      const file = event.addedFiles[0]; 
      this.businessService.uploadMedia(this.files[0]).subscribe({
        next: (res: any) => {
  
          this.uploadMediaUrl = res.image_url;
     
        },
        error: (err: any) => {
          // Handle errors
        }
      });
      
   
    }
  }



 public  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1)
    if (this.files.length === 0) {
      this.isFilesPresent = false;
    }
  }

  public getSafeURL(file: File): any {
    return URL.createObjectURL(file)
   
  }

  public getAddress(place: any) {
    this.fullAddress = place.formatted_address
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    const array = place
    array.address_components.filter((element: any) => {
      element.types.filter((type: any) => {
        if (type == 'country') {
          this.country = element.long_name
        }
        if (type == 'administrative_area_level_3') {
          this.city = element.long_name
        }
        if (type == 'postal_code') {
          this.zipcode = element.long_name
        }
        if (type == 'administrative_area_level_1') {
          this.state = element.long_name
        }
      })
    })
    this.latitude = place.geometry.location.lat()
    this.longitude = place.geometry.location.lng()
    this.initMap()
  }



  public initMap() {
    let map
    // Get the map container element by its ID
    const mapElement = document.getElementById('map')

    // Ensure that the map element is not null
    if (mapElement !== null) {
      // Create a new Google Map instance
      map = new google.maps.Map(mapElement, {
        center: { lat: this.latitude, lng: this.longitude }, // Use dynamic values
        zoom: 13,
      })

      if (this.latitude && this.longitude) {
        // Add a marker to the map
        const marker = new google.maps.Marker({
          position: { lat: this.latitude, lng: this.longitude }, // Use dynamic values
          map: map,
          title: 'Marker Title',
        })
      }
    } else {
    }
  }


  public onTagSelectionChange() {
    const tagNames = this.tags.map((tag) => tag.toString()) // Convert tag numbers to strings
    this.selectedTagsString = tagNames.join(', ') // Convert array to string with comma separator
  }

  public getBusinessCat() {
    this.businessService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.post_category = res.data
      },
      error:(err)=>{

      }
    })
  }

  public onCategoryChange() {
    this.categoriesValue = this.businessInfoForm.value.post_category
    this.getDefaultCat()
  }

  public getTags() {
    this.businessService.getTags().subscribe({
      next: (res: any) => {
        this.post_tags = res.data
      },
      error:(err)=>{
        
      }
    })
  }

  public getDefaultCat() {
    this.businessService.getDefaultCat(this.categoriesValue).subscribe({
      next: (res: any) => {
        this.selectedDefaultCategories = res.data
      },
      error:(err)=>{
        
      }
    })
  }

  public getBusinessFormDetails(postId: any) {
    this.businessService
      .getBusiness(this.postId ? this.postId : postId)
      .subscribe({
        next: (res) => {
          this.businessFormDetails = res?.data?.[0] || null
          this.businessInfoForm.patchValue({
            post_title:this.businessFormDetails.post_title ? this.businessFormDetails.post_title : 'NA',
            post_content:this.businessFormDetails.post_content ? this.businessFormDetails.post_content : 'NA',    
            business_email:this.businessFormDetails.business_email ? this.businessFormDetails.business_email : 'NA',
            contact_phone:this.businessFormDetails.contact_phone ? this.businessFormDetails.contact_phone : 'NA',
            website:this.businessFormDetails.website ? this.businessFormDetails.website : 'Na',
            mapview:this.businessFormDetails.mapview ? this.businessFormDetails.mapview : 'NA',
            post_category:this.businessFormDetails.post_category?.map((category: any) => category?.id),
            default_category: this.businessFormDetails.default_category ? this.businessFormDetails.default_category.id : 'NA'
          })
        
          this.street = this.businessFormDetails.street;
          this.latitude = this.businessFormDetails.latitude;
          this.longitude = this.businessFormDetails.longitude;
          this.zipcode = this.businessFormDetails.zip;
          this.state = this.businessFormDetails.region ;
          this.country = this.businessFormDetails.country;
          this.city = this.businessFormDetails.city;
          this.post_tags = this.businessFormDetails.post_tags?.map((tag:any)=>tag.id )
        },
        error:(err)=>{
        
        }
      })
  }


  
  public addBusiness(val?: any) {
    this.isloader = true
      const body: any = {
        post_title: this.businessInfoForm.value.post_title,
        contact_phone: parseInt(
          this.businessInfoForm.value.contact_phone?.e164Number,
        ),
        business_email: this.businessInfoForm.value.business_email,
        post_category: this.businessInfoForm.value.post_category.join(', '),
        default_category: this.businessInfoForm.value.default_category,
        latitude: this.latitude,
        longitude: this.longitude,
        city: this.city,
        region: this.state,
        country: this.country,
        zip: this.zipcode,
        post_content: this.businessInfoForm.value.post_content,
        website: this.businessInfoForm.value.website,
        post_tags: this.selectedTagsString,
        street:this.fullAddress,
        logo:this.uploadMediaUrl,
        mapview:this.businessInfoForm.value.mapview
      }
      if(this.isFormFilled){
        this.isloader = true
        const updatebody: any = {
          post_title: this.businessInfoForm.value.post_title,
          contact_phone: parseInt(
            this.businessInfoForm.value.contact_phone?.e164Number,
          ),
          business_email: this.businessInfoForm.value.business_email,
          post_category: this.businessInfoForm.value.post_category.join(', '),
          default_category: this.businessInfoForm.value.default_category,
          latitude: this.latitude,
          longitude: this.longitude,
          city: this.city,
          region: this.state,
          country: this.country,
          zip: this.zipcode,
          post_content: this.businessInfoForm.value.post_content,
          website: this.businessInfoForm.value.website,
          post_tags: this.selectedTagsString,
          street:this.fullAddress,
          logo:this.uploadMediaUrl,
          mapview:this.businessInfoForm.value.mapview,
          post_id:this.localStoragePostId ? this.localStoragePostId : this.postId
        }
        this.businessService.updateBusiness(updatebody).subscribe({
          next: (res) => {
            this.isloader = false
            this.addBusinessFormData = res
            this.isFormFilled = true
            this.isSubscriptionStepper = true
            this.getBusinessFormDetails(this.localStoragePostId ? this.localStoragePostId : this.postId)
            Swal.fire({
              toast: true,
              text: 'Business Information updated successfully!',
              animation: false,
              icon: 'success',
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            })
          },
          error: (err) => {
            this.isloader = false
          },
        })
      }else{
      this.businessService.addBusiness(body).subscribe({
        next: (res) => {
          this.isloader = false
          this.addBusinessFormData = res
          this.isFormFilled = true
          this.postId = res.post_id
          this.isSubscriptionStepper = true
          this.getBusinessFormDetails(this.postId)
          this.localStorageService.saveData('postId', this.postId)
          this.businessService.isBusinessFormFilled.next(true)
          this.localStorageService.saveData("isBusinessFormFilled" , "true")
          const post_id = res.post_id
          this.businessService.storePostId.next(post_id)
          Swal.fire({
            toast: true,
            text: 'Business Information added successfully!',
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
        },
        error: (err) => {
          this.isloader = false
        },
      })
      }
    }
  

}