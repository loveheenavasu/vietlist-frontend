import { RouterOutlet, RouterLink, Router, RouterLinkActive } from '@angular/router'
import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import {
  AuthenticationService,
  LocalStorageService,
  ProfileMenu,
  Roles,
  SidebarService,
} from '@vietlist/shared'
import { EditProfileComponent } from './components'
import { NgClass, NgFor, NgIf } from '@angular/common'
import { ProfileService } from './service/profile.service'
import { MatTooltipModule } from '@angular/material/tooltip'
import { SkeletonLoadingComponent } from '../common-ui/skeleton-loading/skeleton-loading.component'

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [
    EditProfileComponent,
    NgIf,
    NgClass,
    RouterOutlet,
    RouterLink,
    MatTooltipModule,
    RouterLinkActive,
    SkeletonLoadingComponent,
    NgFor
  ],
  templateUrl: './manage-profile.html',
  styleUrl: './manage-profile.scss',
})
export class ManageProfileComponent {
  @ViewChild('fileInput', { static: false })
  public fileInput!: ElementRef<HTMLInputElement>
  public sidebarMenu: ProfileMenu[] = []
  public userDetail: any
  public imgUrl: any
  public activeIndex: any = 0
  public showFullEmail: boolean = false
  public isUploading: boolean = false
  public menuItems: any
  public basedLevelMenuItem: any
  public isMenuLoading:boolean = true
  public role = Roles
  constructor(
    private sidebarService: SidebarService,
    private sessionservice: AuthenticationService,
    private router: Router,
    private profileService: ProfileService,
    private localStorage: LocalStorageService
  ) {


    this.activeIndex = this.router.url


    this.sessionservice.userDetailResponse.subscribe((res) => {
      this.userDetail = res

    })



  }


  ngOnInit() {
    this.fetchProfileDetail()

  }


  public isRouteActive(route: string): boolean {
    return this.router.isActive(route, true)
  }

  public handleFileInput(event: any) {
    event.stopPropagation()
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()

      reader.readAsArrayBuffer(event.target.files[0])

      reader.onload = (event) => {
        if (event.target) {
          const arrayBuffer = event.target.result as ArrayBuffer
          this.uploadImage(arrayBuffer)
        }
      }
    }
  }

  private uploadImage(arrayBuffer: ArrayBuffer) {
    this.isUploading = true // Set uploading flag
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' })
    const formData = new FormData()
    formData.append('user_email', '')
    formData.append('display_user_name', '')
    formData.append('user_image', blob, 'image.jpg')

    this.profileService.userProfileUpdate(formData).subscribe({
      next: (res: any) => {
        this.userDetail = res.data?.user
        this.imgUrl = res.data.user.user_image
        this.fetchProfileDetail()
        this.isUploading = false // Reset upl
      },
      error: (err: any) => {
        this.isUploading = false // Reset upl
      },
    })
  }

  public openFileInput(event: any) {
    this.handleFileInput(event)
  }

  public fetchProfileDetail() {
    this.isMenuLoading = true
    this.profileService.userDetails().subscribe({
      next: (res) => {

        this.userDetail = res.data.user
        this.imgUrl = res.data.user.user_image
        this.localStorage.saveData('level_id', res.data.user.level_id)
        this.sidebarService.getSidebarLinks().subscribe((res) => {
          this.sidebarMenu = res
          const role = this.localStorage.getData('loginInfo')
          const roleGet = JSON.parse(role)
          if (roleGet.user_role == Roles.subscriber) {
            this.menuItems = this.sidebarMenu.filter(tab =>
              tab.label !== 'Ads' &&
              tab.label !== 'My Business' &&
              tab.label !== 'Subscriptions' &&
              tab.label !== 'Billing Address' &&
              tab.label !== 'Privacy' &&
              tab.label !== 'Notifications' &&
              tab.label !== 'Invoices' &&
              tab.label !== 'Transactions' &&
              tab.label !== 'Notifications Settings' &&
              tab.label !== 'My Bookings' &&
              tab.label !== 'My Events'
            );
          } else if (this.userDetail.user_role == Roles.businessOwner && this.userDetail.level_id == '1') {
            this.menuItems = this.sidebarMenu.filter(tab =>
              tab.label !== 'Ads'
            );
            return this.menuItems

          } else if (roleGet.user_role == 'subscriber') {
            return this.menuItems
          } else {
            return this.menuItems = this.sidebarMenu
          }

        })
        this.isMenuLoading = false
      },
      error: (err: any) => {
        this.router.navigateByUrl('/login')

      },
    })
  }

  addClass(url: string) {
    // Update the activeIndex when clicking on a menu item
    this.activeIndex = url
    if (this.activeIndex == '/logout') {
      this.sessionservice.OnLogOut.next(true)
    }
  }

  public filterTabsByLevelId(levelId: any) {
    if (this.userDetail.level_id == '1') {
      this.sidebarMenu = this.sidebarMenu.filter((res) => {
        res.label !== ''
      })
    }
  }

get skeletonItems() {
  return new Array(this.menuItems.length > 0 ? 0 : 4).fill(null);
}


  public handleLogout() {
    // this.isAuthenticated = false
    this.sessionservice.clearAuthentication()
    this.router.navigateByUrl('/')
  }
}