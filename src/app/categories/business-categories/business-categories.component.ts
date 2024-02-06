import { FullPageLoaderService } from 'src/app/shared/utils/services/loader.service';
import { BusinessService } from '../../manage-business/service/business.service';
import { NgClass } from '@angular/common'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-business-categories',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './business-categories.component.html',
  styleUrl: './business-categories.component.scss',
})
export class BusinessCategories {
  public selectedLayout: string = 'grid'
  public businessCategoriesArray : any[]=[]
  public subscription!:Subscription
  constructor(private businessCategoriesService:BusinessService , private fullPageLoaderService:FullPageLoaderService) {}
  
  ngOnInit(){
    this.getBusinessCategories()
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  getBusinessCategories(){
    this.fullPageLoaderService.showLoader()
    this.businessCategoriesService.getBusinessCat().subscribe({
      next:(res:any)=>{
        this.fullPageLoaderService.hideLoader()
        this.businessCategoriesArray = res.data
        console.log(this.businessCategoriesArray , "RESPONSE")
      }
    })
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
