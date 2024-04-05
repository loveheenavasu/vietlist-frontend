import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { FullPageLoaderService, AuthenticationService } from '@vietlist/shared';
import { NgxPaginationModule } from 'ngx-pagination';

import { Subscription } from 'rxjs';
import { LoaderComponent } from 'src/app/common-ui';
import { FindEventParams } from 'src/app/manage-business/service/business.interface';
import { EventService } from 'src/app/manage-event/service/event.service';
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress';

@Component({
  selector: 'app-resources',
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
    NgIf],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {
  public datePipe = new DatePipe('en-US');

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
  public postTitle = new FormControl('')
  public postPerPage: number = 6
  public currentPage: number = 1
  public isPaginationClick: boolean = false
  public isPaginationVisible: boolean = false
  public totalCount: number = 0
  public totalPages: number = 0;
 

 

  isSearching: boolean = false;
  constructor(
    private eventService: EventService,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
    private authenticationService: AuthenticationService
    
  ) {

  }

  ngOnInit() {
    this.getPublishEventData()
    this.getEventCat()
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  public getEventCat() {
    this.eventService.getEventCat().subscribe({
      next: (res: any) => {
        this.event_category = res.data
      },
      error: (err) => { },
    })
  }

  formatDate(time: string): string {
    // Manually append today's date before formatting
    const today = new Date();
    const formattedTime = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${time}`;
    return this.datePipe.transform(formattedTime, 'shortTime') || '';
  }

  private getBrowserTimezone(): string {
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return this.convertTimezoneIdentifier(browserTimezone);
  }

  private convertTimezoneIdentifier(timezone: string): string {
    switch (timezone) {
      case 'Asia/Calcutta':
        return 'Asia/Kolkata';
      default:
        return timezone;
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




  public gotToEventDetails(id: any, isGlobal: any) {
    this.router.navigate(['/event-details', id], { queryParams: { isGlobal: isGlobal } });

  }


  public clearFilters(): void {
    // Clear local variables
    this.authenticationService.clearLocationValue.next(true)
    this.fullAddress = '';
    this.state = '';
    this.country = '';
    this.city = '';
    this.zipcode = '';
    this.latitude = '';
    this.longitude = '';
    this.street = ''
    // Reset category FormControl
    this.category.setValue(null);
    this.postTitle.setValue(null)
    // Reset pagination and loader
    this.currentPage = 1;
    this.isPaginationVisible = false;
    this.isLoader = true;

    // Retrieve events again
    this.getPublishEventData();
  }

  
  getPublishEventData(): void {
    this.isSearching = false; // Reset search flag
    this.fullPageLoaderService.showLoader();
    const params: FindEventParams = {
      posts_per_page: this.postPerPage,
      page_no: this.currentPage,
      timezone: this.getBrowserTimezone()
    };

    this.eventService.getPublishEvents(params).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader();
        this.publishEventsArray = res.data;
        this.totalCount = res.total_count;
        this.calculateTotalPages();
      },
      error: (err: any) => {
        // Handle error
        this.fullPageLoaderService.hideLoader();
      }
    });
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalCount / this.postPerPage);
  }

 
}
