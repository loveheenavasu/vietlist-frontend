import { ProfileService } from 'src/app/manage-profile/service/profile.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.scss'
})
export class AdsListComponent {
  public allAds :any[]=[]
  constructor(private profileService:ProfileService , private router:Router){}

  ngOnInit(){
    this.getAllAds()
  }

  public getAllAds(){
    this.profileService.getAds().subscribe({
      next:(res)=>{
        this.allAds = res?.data
      }
    })
  }

  public handleCreateAdd(){
  this.router.navigateByUrl('/manage-profile/create-ad')
  }
}
