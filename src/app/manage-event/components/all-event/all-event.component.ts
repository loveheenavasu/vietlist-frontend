import { FindEventParams} from './../../../manage-business/service/business.interface';
import { DatePipe, NgClass } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { Router } from '@angular/router'
import { FullPageLoaderService } from '@vietlist/shared'
import { NgxPaginationModule } from 'ngx-pagination'
import { Subscription } from 'rxjs'
import { LoaderComponent } from 'src/app/common-ui'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { EventService } from '../../service/event.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-event',
  standalone: true,
  imports: [  
    MatIconModule,
    NgClass,
    AutocompleteComponent,
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    MatSelectModule,
    NgxPaginationModule,
  ],
  templateUrl: './all-event.component.html',
  styleUrl: './all-event.component.scss',
})
export class AllEventComponent {
  public selectedLayout: string = 'grid'
  public publishEventsArray: any[] = []
  public subscription!: Subscription
  public street: any
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public fullAddress: any
  public longitude: any
  public latitude: any
  public isLoader: boolean = false
  public event_category: any[] = []
  public category = new FormControl('')
  public postPerPage: number = 1
  public currentPage: number = 1
  public isPaginationClick: boolean = false
  public isPaginationVisible: boolean = false
  public totalCount: number = 0 

  constructor(
    private eventService: EventService,
    private fullPageLoaderService: FullPageLoaderService,
    private router:Router,

  ) {

  }

  ngOnInit() {
    this.getEventCat()
    this.getPublishEventData()
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  public getPublishEventData() {
    this.fullPageLoaderService.showLoader()
    const params: FindEventParams = {}
    const postPerPage = this.postPerPage
    if (postPerPage) {
      params['posts_per_page'] = postPerPage
    }
    if (this.currentPage) {
      params['page_no'] = this.currentPage
    }
    this.eventService.getPublishEvents(params).subscribe({
      next: (res: any) => {
        console.log(res)
        this.fullPageLoaderService.hideLoader()
        this.publishEventsArray = res.data
        console.log(this.publishEventsArray)
      },
    })
  }


  public getEventCat() {
    this.eventService.getEventCat().subscribe({
      next: (res: any) => {
        this.event_category = res.data
      },
      error: (err) => {},
    })
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


  public searchBusiness() {
    if (!this.category.value && !this.street) {
      Swal.fire({
        toast: true,
        text: 'Please fill either category or address',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      return
    }
    this.fullPageLoaderService.showLoader()
    const post_category = this.category.value
    const postPerPage = this.postPerPage
    const params: FindEventParams = {}
    if (post_category) {
      params['post_category'] = post_category
    }
    if (postPerPage) {
      params['posts_per_page'] = postPerPage
    }
    if (this.currentPage) {
      params['page_no'] = this.currentPage
    }
    if (this.city) {
      params['city'] = this.city
    }
    if (this.state) {
      params['region'] = this.state
    }
    if (this.fullAddress) {
      params['street'] = this.fullAddress
    }
    if (this.zipcode) {
      params['zip'] = this.zipcode
    }
    if (this.country) {
      params['country'] = this.country
    }

    this.eventService.findEvents(params).subscribe({
      next: (res: any) => {
        this.isLoader = false
        this.isPaginationClick = false
        this.isPaginationVisible = true
        this.fullPageLoaderService.hideLoader()
        this.publishEventsArray = res.data
        this.totalCount = res.total_count
      },
      error: (err: any) => {
        this.isLoader = false
      },
    })
  }

 
  public gotToEventDetails(id:any, isGlobal:any){
    this.router.navigate(['/event-details', id], { queryParams: { isGlobal: isGlobal } });

  }

  public handlePageChange(event: number): void {
    this.isPaginationClick = true
    this.currentPage = event
  
    if (this.category.value) {
      this.searchBusiness()
    } else {
      this.getPublishEventData()
    }
  }

  public clearFilters(): void {
    // Clear local variables
    this.fullAddress = '';
    this.state = '';
    this.country = '';
    this.city = '';
    this.zipcode = '';
    this.latitude = '';
    this.longitude = '';
  
    // Reset category FormControl
    this.category.setValue(null);
  
    // Reset pagination and loader
    this.currentPage = 1;
    this.isPaginationVisible = false;
    this.isLoader = true;
  
    // Retrieve events again
    this.getPublishEventData();
  }
  
}
