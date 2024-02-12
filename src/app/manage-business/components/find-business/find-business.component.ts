import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { BusinessService } from '../../service/business.service'
import { FullPageLoaderService } from '@vietlist/shared'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { BusinessCategoryResponse, FindBusinessParams } from '../../service/business.interface'
import { LoaderComponent } from 'src/app/common-ui'
import { NgxPaginationModule } from 'ngx-pagination'
import { MatSliderModule } from '@angular/material/slider'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-find-business',
  standalone: true,
  imports: [
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent,
    NgxPaginationModule,
    MatSliderModule,
    FormsModule,
    AutocompleteComponent
  ],
  templateUrl: './find-business.component.html',
  styleUrl: './find-business.component.scss',
})
export class FindBusinessComponent {
  public selectedLayout: string = 'list'
  public categoriesValue: any
  public selectedDefaultCategories: any[] = []
  public findBusinessForm!: FormGroup
  public businessCat: BusinessCategoryResponse[] = []
  public findBusinessData: any[] = []
  public loader: boolean = false
  public postPerPage: number = 2
  public currentPage: number = 1
  public isPaginationClick: boolean = false
  public isPaginationVisible: boolean = false
  public totalCount: number = 0
  public price: number = 0
  public slidervalue: number = 0
  public maxPrice: number = 0
  public latitude: any = []
  public longitude: any = []
  public street: any
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public fullAddress: any
  constructor(
    private businessCategoriesService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
    private fb: FormBuilder,
  ) {
    this.findBusinessForm = this.fb.group({
      post_category: [''],
      hours: [''],
      address: [''],
      model: [''],
      price: [''],
      slidervalue: [''],
    })
  }

  ngOnInit() {
    this.getBusinessCat()
    this.initMap()
    // this.getPublishBusinessData()
    this.searchBusiness()
    this.findBusinessForm.value.slidervalue.setValue(0)
  }
  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  getPublishBusinessData() {
    this.fullPageLoaderService.showLoader()
    this.businessCategoriesService.ListingBusiness().subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        this.findBusinessData = res.data
        this.maxPrice = res.max_price
        this.totalCount = res.total_count
        this.findBusinessData.forEach((obj) => {
          if (obj.latitude && obj.longitude) {
            this.latitude.push(obj.latitude)
            this.longitude.push(obj.longitude)
          }
        })
        this.initMap()
        console.log(this.findBusinessData, 'RESPONSE')
      },
    })
  }

  public getBusinessCat() {
    this.businessCategoriesService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.businessCat = res.data
      },
    })
  }

  public onCategoryChange() {
    this.categoriesValue = this.findBusinessForm.value.post_category
    this.getDefaultCat()
  }
  public getDefaultCat() {
    this.businessCategoriesService
      .getDefaultCat(this.categoriesValue)
      .subscribe({
        next: (res: any) => {
          this.selectedDefaultCategories = res.data
        },
      })
  }

  // public searchBusiness() {
  //   this.loader = true
  //   const post_category = this.findBusinessForm.value.post_category
  //   const price = this.findBusinessForm.value.slidervalue
  //   const postPerPage = 2
  //   const params: FindBusinessParams = {};
  //   if (post_category) {
  //     params['post_category'] = post_category
  //   }
  //   if (price) {
  //     params['price'] = price
  //   }
  //   if (postPerPage) {
  //     params['posts_per_page'] = postPerPage
  //   }
  //   if(this.currentPage){
  //     params['page_no'] = this.currentPage
  //   }
  //   if (this.city) {
  //     params['city'] = this.city;
  //   }
  //   if (this.state) {
  //     params['region'] = this.state;
  //   }
  //   if (this.fullAddress) {
  //     params['street'] = this.fullAddress;
  //   }
  //   if (this.zipcode) {
  //     params['zip'] = this.zipcode;
  //   }
  //   if (this.country) {
  //     params['country'] = this.country;
  //   }
  
  
  //   this.businessCategoriesService
  //     .findBusiness(params)
  //     .subscribe({
  //       next: (res: any) => {
  //         this.loader = false
  //         this.isPaginationClick = false
  //         this.isPaginationVisible = true
  //         this.fullPageLoaderService.hideLoader()
  //         this.findBusinessData = res.data
  //         this.totalCount = res.total_count
  //         this.maxPrice = res.max_price;
  //       },
  //       error: (err: any) => {
  //         this.loader = false
  //       },
  //     })
  // }
  
  public searchBusiness() {
    this.loader = true;
    const post_category = this.findBusinessForm.value.post_category;
    const price = this.findBusinessForm.value.slidervalue;
    const postPerPage = 2;
    const params: FindBusinessParams = {};
    
    if (post_category) {
      params['post_category'] = post_category;
    }
    if (price) {
      params['price'] = price;
    }
    if (postPerPage) {
      params['posts_per_page'] = postPerPage;
    }
    if (this.currentPage) {
      params['page_no'] = this.currentPage;
    }
    if (this.city) {
      params['city'] = this.city;
    }
    if (this.state) {
      params['region'] = this.state;
    }
    if (this.fullAddress) {
      params['street'] = this.fullAddress;
    }
    if (this.zipcode) {
      params['zip'] = this.zipcode;
    }
    if (this.country) {
      params['country'] = this.country;
    }
    
    if (!post_category) {
      // If post_category is not provided, make the API call without any parameters
      this.businessCategoriesService.ListingBusiness().subscribe({
        next: (res: any) => {
          this.loader = false;
          this.isPaginationClick = false;
          this.isPaginationVisible = true;
          this.fullPageLoaderService.hideLoader();
          this.findBusinessData = res.data;
          this.totalCount = res.total_count;
          this.maxPrice = res.max_price;
        },
        error: (err: any) => {
          this.loader = false;
        },
      });
    } else {
      // If post_category is provided, make the API call with the constructed parameters
      this.businessCategoriesService.findBusiness(params).subscribe({
        next: (res: any) => {
          this.loader = false;
          this.isPaginationClick = false;
          this.isPaginationVisible = true;
          this.fullPageLoaderService.hideLoader();
          this.findBusinessData = res.data;
          this.totalCount = res.total_count;
          this.maxPrice = res.max_price;
        },
        error: (err: any) => {
          this.loader = false;
        },
      });
    }
  }
  

  public handlePageChange(event: number): void {
    this.isPaginationClick = true
    this.currentPage = event
    console.log('check pagination ', this.currentPage)
    if (this.findBusinessForm.value.post_category) {
      this.searchBusiness()
    } else {
      this.getPublishBusinessData()
    }
  }

  public updatePrice(event: any) {
    console.log('range', this.findBusinessForm.value.slidervalue)
    this.price = event.value
    this.slidervalue = this.findBusinessForm.value.slidervalue
  }

  public initMap() {
    console.log(this.latitude, this.longitude, 'LATLNG')
    let map: any
    const mapElement = document.getElementById('map')

    // Ensure that the map element is not null
    if (mapElement !== null) {
      // Create a new Google Map instance
      map = new google.maps.Map(mapElement, {
        center: {
          lat: parseFloat(this.latitude[30.3610]),
          lng: parseFloat(this.longitude[76.8485]),
        }, // Use dynamic values
        zoom: 13,
      })

      if (this.latitude && this.longitude) {
        // Array of marker positions
        // const markerPositions = [
        //   { lat: parseFloat(this.latitude[0]), lng: parseFloat(this.longitude[0]) },
        //   { lat: 51.678, lng: 7.809 },
        //   { lat: 51.679, lng: 7.808 },
        //   { lat: 51.680, lng: 7.807 },
        //   { lat: 51.681, lng: 7.806 },
        // ];

        this.findBusinessData.forEach((data) => {
          console.log('check data', data)
          const marker = new google.maps.Marker({
            position: {
              lat: parseFloat(data.latitude),
              lng: parseFloat(data.longitude),
            },
            map: map,
            title: 'Marker Title',
          })
          console.log('check marker', marker)
        })
      }
    } else {
      console.error('Map element not found')
    }
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
  }
}
