import { ProfileService } from 'src/app/manage-profile/service/profile.service';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from '@vietlist/shared';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.scss'
})
export class AdsListComponent {
  public allAds: any[] = []
  constructor(private profileService: ProfileService, private router: Router, private sessionService: AuthenticationService) { }

  ngOnInit() {
    this.getAllAds()
  }

  public getAllAds() {
    this.profileService.getAdByUserId().subscribe({
      next: (res) => {
        console.log("check the ad data by userId", res)
        this.allAds = res.data;
        console.log("check ad array", this.allAds);
      }
    })
  }

  public handleCreateAdd() {
    this.router.navigateByUrl('/manage-profile/create-ad')
  }

  public onEdit(data: any) {

    const queryParams: NavigationExtras = { queryParams: { id: data.ad_data?.id } };
    this.router.navigate(['/manage-profile/create-ad'], queryParams);
  }

  public deleteAd(adId: any) {
    console.log("check delete id", adId)
    this.profileService.deleteAd(adId).subscribe({
      next: (res) => {
        Swal.fire({
          toast: true,
          text: 'Ad  deleted successfully ',
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        this.allAds = this.allAds.filter(ad => ad.ad_data.id !== adId);
      }
    })
  }
}
