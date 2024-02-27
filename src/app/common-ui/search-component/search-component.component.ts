import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { LoaderComponent } from '../public-api';
import { BusinessService } from 'src/app/manage-business/service/business.service';
import { FindBusinessParams } from 'src/app/manage-business/service/business.interface'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [AutocompleteComponent,
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgSelectModule
  ],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.scss'
})
export class SearchComponentComponent {
  @Input() post_category?: any
  @Output() categorySelected = new EventEmitter<any>();
  public street: any
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public fullAddress: any
  public isLoader: boolean = false
  public longitude: any
  public latitude: any
  public category = new FormControl('')
  public businessCategoriesArray: any[] = []
  // public post_category: any[] = []
  public filteredOptions: any[] = [];
  public selectedCategory: any

  constructor(private businessCategoriesService: BusinessService,) { }

  ngOnInit() {

  }
  customSearch(term: string, item: any) {
    term = term.toLowerCase();
    return item.name.toLowerCase().indexOf(term) > -1;
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      this.categorySelected.emit(this.selectedCategory);
      console.log("check selected cat", this.selectedCategory)
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
      error: (error) => { },
    })
  }

}
