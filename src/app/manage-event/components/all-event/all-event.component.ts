import { DatePipe, NgClass } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { Router } from '@angular/router'
import { FullPageLoaderService } from '@vietlist/shared'
import { Subscription } from 'rxjs'
import { LoaderComponent } from 'src/app/common-ui'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { EventService } from '../../service/event.service'

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
    MatSelectModule,],
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
  constructor(
    private eventService: EventService,
    private fullPageLoaderService: FullPageLoaderService,
    private router:Router
  ) {}

  ngOnInit() {
    this.getEventCat()
    this.getPublishEventData()
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  public getPublishEventData() {
    this.fullPageLoaderService.showLoader()
    this.eventService.getPublishEvents().subscribe({
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

  // public search() {
  //   this.isLoader = true
  //   const params: FindBusinessParams = {}
  //   if (this.city) {
  //     params['city'] = this.city
  //   }
  //   if (this.state) {
  //     params['region'] = this.state
  //   }
  //   if (this.fullAddress) {
  //     params['street'] = this.fullAddress
  //   }
  //   if (this.zipcode) {
  //     params['zip'] = this.zipcode
  //   }
  //   if (this.country) {
  //     params['country'] = this.country
  //   }
  //   if (this.category.value) {
  //     params['post_category'] = this.category.value
  //   }

  //   this.businessCategoriesService.findBusiness(params).subscribe({
  //     next: (res) => {
  //       this.isLoader = false

  //       this.businessCategoriesArray = res.data
  //     },
  //     error: (error) => {},
  //   })
  // }

  public search(){}


  public gotToEventDetails(id:any){
    this.router.navigate(['/event-details', id])
  }
}
