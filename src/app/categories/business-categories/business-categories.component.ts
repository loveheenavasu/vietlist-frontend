import { FullPageLoaderService } from 'src/app/shared/utils/services/loader.service'
import { BusinessService } from '../../manage-business/service/business.service'
import { NgClass } from '@angular/common'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Subscription } from 'rxjs'
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { LoaderComponent, SearchComponentComponent } from 'src/app/common-ui'
import { FindBusinessParams } from 'src/app/manage-business/service/business.interface'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { NavigationExtras, Router } from '@angular/router'
import { clearSavedFilter } from 'src/app/shared/helper'

@Component({
  selector: 'app-business-categories',
  standalone: true,
  imports: [
    MatIconModule,
    NgClass,
    AutocompleteComponent,
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    SearchComponentComponent,
  ],
  templateUrl: './business-categories.component.html',
  styleUrl: './business-categories.component.scss',
})
export class BusinessCategories {
  public selectedLayout: string = 'grid'
  public businessCategoriesArray: any[] = []
  public street: any
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public fullAddress: any
  public longitude: any
  public latitude: any
  public isLoader: boolean = false
  public post_category: any[] = []
  public category = new FormControl('')
  public subscription!: Subscription
  constructor(
    private businessCategoriesService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getBusinessCategories()
    this.getBusinessCat()
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  getBusinessCategories() {
    this.fullPageLoaderService.showLoader()
    this.businessCategoriesService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        this.businessCategoriesArray = res.data
      },
    })
  }

  onCategorySelected(selectedCategory: any) {
    if (selectedCategory) {
      clearSavedFilter()
      this.router.navigate(['/find-business'], {
        state: {
          id: selectedCategory?.id,
        },
      })
    }
  }

  public getBusinessCat() {
    this.businessCategoriesService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.post_category = res.data
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

  public search() {
    this.isLoader = true
    const params: FindBusinessParams = {}
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
    if (this.category.value) {
      params['post_category'] = this.category.value
    }

    this.businessCategoriesService.findBusiness(params).subscribe({
      next: (res) => {
        this.isLoader = false

        this.businessCategoriesArray = res.data
      },
      error: (error) => {},
    })
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
