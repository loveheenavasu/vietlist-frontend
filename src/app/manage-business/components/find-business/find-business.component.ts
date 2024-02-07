import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { BusinessService } from '../../service/business.service'
import { FullPageLoaderService } from '@vietlist/shared'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BusinessCategoryResponse } from '../../service/business.interface'
import { LoaderComponent } from 'src/app/common-ui'

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
    LoaderComponent
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
  lat = 51.678418
  lng = 7.809007

  constructor(private businessCategoriesService: BusinessService, private fullPageLoaderService: FullPageLoaderService, private fb: FormBuilder) {

    this.findBusinessForm = this.fb.group({
      post_category: [''],
      hours: [''],
      address: [''],
      model: [''],
      price: ['']
    })
  }

  ngOnInit() {
    this.getBusinessCat()
  }
  public handleLayout(layout: string) {
    this.selectedLayout = layout
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
    this.businessCategoriesService.getDefaultCat(this.categoriesValue).subscribe({
      next: (res: any) => {
        this.selectedDefaultCategories = res.data
      },
    })
  }

  public searchBusiness() {
    this.loader = true
    const post_category = this.findBusinessForm.value.post_category;
    const price = this.findBusinessForm.value.price
    const postPerPage = 2

    this.businessCategoriesService.findBusiness(price, post_category, postPerPage).subscribe({
      next: (res: any) => {
        this.loader = false
        this.findBusinessForm.reset()
        this.fullPageLoaderService.hideLoader()
        this.findBusinessData = res.data
        console.log("RESPONSE", this.findBusinessData)
      },
      error: (err: any) => {
        this.loader = false
        console.log("error", err)
      }
    })
  }

}
