import { ProfileService } from 'src/app/manage-profile/service/profile.service';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared';
import Swal from 'sweetalert2'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe';

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [TruncateHtmlPipe],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.scss'
})
export class AdsListComponent {
  public allAds: any[] = []
  constructor(private profileService: ProfileService, private router: Router, private sessionService: AuthenticationService , private fullpageloader:FullPageLoaderService) { }

  ngOnInit() {
    this.getAllAds()
  }

  


  public handleCreateAdd() {
    this.router.navigateByUrl('/manage-profile/create-ad')
  }

  public onEdit(data: any) {

    const queryParams: NavigationExtras = { queryParams: { id: data.ad_data?.id } };
    this.router.navigate(['/manage-profile/create-ad'], queryParams);
  }

  public deleteAd(adId: any) {
    Swal.fire({
      title: 'Do you really want to delete this Ad?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.deleteAd(adId).subscribe({
          next: (res) => {
            if (res) {
              this.getAllAds()
            }
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
            // this.allAds = this.allAds.filter(ad => ad.ad_data.id !== adId);

          }
        })
      }

    })

  }
  public getAllAds() {
  this.fullpageloader.showLoader()
    this.profileService.getAdByUserId().subscribe({
      next: (res) => {
        this.fullpageloader.hideLoader()
        this.allAds = res.data;
      }
    })
  }
}
