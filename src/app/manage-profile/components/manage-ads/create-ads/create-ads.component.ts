import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';
import { ProfileService } from 'src/app/manage-profile/service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ads',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './create-ads.component.html',
  styleUrl: './create-ads.component.scss'
})
export class CreateAdsComponent {
  public allSpaces :any[]=[]
  constructor(private profileService:ProfileService , private router:Router){}

  ngOnInit(){
    this.getAllSpaces()
  }

  public getAllSpaces(){
    this.profileService.getAds().subscribe({
      next:(res)=>{
        this.allSpaces = res?.data
      }
    })
  }

 
}
