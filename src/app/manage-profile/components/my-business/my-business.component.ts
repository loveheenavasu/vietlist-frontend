import { MatTooltipModule } from '@angular/material/tooltip'
import { ProfileService } from './../../service/profile.service'
import { MatIconModule } from '@angular/material/icon'
import { Component } from '@angular/core'
import { FullPageLoaderService, LocalStorageService } from '@vietlist/shared'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { NgClass, NgIf } from '@angular/common'
import Swal from 'sweetalert2'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-my-business',
  standalone: true,
  imports: [MatIconModule, NgClass, NgIf, RouterLink, MatTooltipModule],
  templateUrl: './my-business.component.html',
  styleUrl: './my-business.component.scss',
})
export class MyBusinessComponent {
  public selectedLayout: string = 'grid'
  public businessArray: any[] = []
  constructor(
    private profileService: ProfileService,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
    private localStorage: LocalStorageService,
  ) {}

  ngOnInit() {
    this.getBusiness()
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  getBusiness() {
    this.fullPageLoaderService.showLoader()
    this.profileService.getBusinessByUserId().subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        this.businessArray = res.data
      },
      error: (err) => {
        this.fullPageLoaderService.hideLoader()
      },
    })
  }

  deleteBusiness(postId: any) {
    Swal.fire({
      title: 'Do you really want to delete your business?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.deleteBuisness({ post_id: postId }).subscribe({
          next: (res) => {
            Swal.fire({
              toast: true,
              text: res.message,
              animation: false,
              icon: 'success',
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            })
            this.getBusiness()
          },
          error: (err) => {
            this.fullPageLoaderService.hideLoader()
          },
        })
      }
    })
  }

  ngOnDestroy() {}
  public viewBusiness(postId: any) {
    this.router.navigate(['/preview-business', postId])
  }
  public emailMarketing(postId: any) {
    this.router.navigateByUrl('/email-marketing')
  }

  removeLocalstoagekey() {
    this.localStorage.removeData('isBusinessFormFilled')
    this.localStorage.removeData('isSubscriptionFormFilled')
    this.localStorage.removeData('postId')
  }
}
