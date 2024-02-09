import { ProfileService } from './../../service/profile.service';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { FullPageLoaderService } from '@vietlist/shared';
import { BusinessService } from 'src/app/manage-business/service/business.service';
import { NgClass, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-business',
  standalone: true,
  imports: [MatIconModule, NgClass , NgIf],
  templateUrl: './my-business.component.html',
  styleUrl: './my-business.component.scss'
})
export class MyBusinessComponent {
  public selectedLayout: string = 'grid'
  public businessArray : any[]=[]
  constructor(private profileService:ProfileService , private fullPageLoaderService:FullPageLoaderService) {}
  
  ngOnInit(){
    this.getBusiness()
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  getBusiness(){
    this.fullPageLoaderService.showLoader()
    this.profileService.getBusinessByUserId().subscribe({
      next:(res:any)=>{
        this.fullPageLoaderService.hideLoader()
        this.businessArray = res.data
      }
    })
  }


  deleteBusiness(postId:any){
    this.profileService.deleteBuisness(postId).subscribe({
      next:(res)=>{
        Swal.fire({
          
        })
      }
    })
  }
  ngOnDestroy() {
    
  }
}
