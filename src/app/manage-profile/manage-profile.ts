import {
  RouterOutlet,
  RouterLink,
  Router,
  RouterLinkActive,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router'
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
import { getMessaging, getToken } from 'firebase/messaging'
import { environment } from 'src/environments/environment.development'

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
    NgFor,
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
  public isMenuLoading: boolean = true
  public role = Roles
  public currentPath: any
  public pageTitle: string = ''
  BrokerMenu = [
    'Edit Profile',
    'Change Password',
    'All Leads',
    'My Purchases Leads',
    'Leads transaction history',
    'Delete Account',
    'Settings',
  ]
  constructor(
    private sidebarService: SidebarService,
    private sessionservice: AuthenticationService,
    private router: Router,
    private profileService: ProfileService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
  ) {
    this.activeIndex = this.router.url
    this.sessionservice.userDetailResponse.subscribe((res) => {
      this.userDetail = res
    })
  }

  ngOnInit() {
    this.fetchProfileDetail()
    this.route.url.subscribe((segments) => {
      this.currentPath = this.router.url
      this.setTitle()
      console.log('Current Path:::', this.currentPath)
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = this.router.url
        this.setTitle()
      }
    })
  }

  ngAfterViewInit() {
    // const messaging = getMessaging()
    // getToken(messaging, { vapidKey: environment.firebaseConfig.vapidKey })
    //   .then((currentToken) => {
    //     if (currentToken) {
    //       console.log(
    //         currentToken,
    //         'currentTokencurrentTokencurrentTokencurrentToken',
    //       )
    //       // Send the token to your server and update the UI if necessary
    //       // ...
    //     } else {
    //       // Show permission request UI
    //       // ...
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('An error occurred while retrieving token. ', err)
    //     // ...
    //   })
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = this.router.url
        this.setTitle()
      }
    })
  }

  public setTitle() {
    switch (true) {
      case this.currentPath === '/manage-profile':
        this.pageTitle = 'My Account'
        break
      case this.currentPath === '/manage-profile/change-password':
        this.pageTitle = 'Change Password'
        break
      case this.currentPath === '/manage-profile/privacy':
        this.pageTitle = 'Privacy'
        break
      case this.currentPath === '/manage-profile/manage-ads':
        this.pageTitle = 'Manage Ads'
        break
      case this.currentPath === '/manage-profile/subscription':
        this.pageTitle = 'Manage Subscriptions'
        break
      case this.currentPath === '/manage-profile/billing-address':
        this.pageTitle = 'Manage Billing Address'
        break
      case this.currentPath === '/manage-profile/manage-bookings':
        this.pageTitle = 'My Bookings'
        break
      case this.currentPath === '/manage-profile/my-business':
        this.pageTitle = 'My Business'
        break
      case this.currentPath === '/manage-profile/manage-events':
        this.pageTitle = 'Events Management'
        break
      case this.currentPath === '/manage-profile/cancellation-policy':
        this.pageTitle = 'Cancellation Policy'
        break
      case this.currentPath === '/manage-profile/setting':
        this.pageTitle = 'Settings'
        break
      case this.currentPath === '/manage-profile/delete-account':
        this.pageTitle = 'Delete Account'
        break
      case this.currentPath === '/manage-profile/manage-coupons':
        this.pageTitle = 'Manage Coupons'
        break
      case this.currentPath === '/analytics':
        this.pageTitle = 'Analytics'
        break
      case this.currentPath === '/manage-profile/my-purchased-leads':
        this.pageTitle = 'My Purchased Leads'
        break
      case this.currentPath === '/manage-profile/leads-transaction-history':
        this.pageTitle = 'Leads Purchased History'
        break
      case this.currentPath === '/manage-profile/all-synced-listing':
        this.pageTitle = 'All Synced Listings'
        break
      case this.currentPath === '/manage-profile/synced-listings':
        this.pageTitle = 'Synced Listings'
        break
      case this.currentPath.startsWith('/manage-profile/all-bookings/'):
        const segments = this.currentPath.split('/')
        if (segments.length === 4) {
          // Assuming the dynamic ID is in the 3rd segment
          const bookingId = segments[3]
          this.pageTitle = `All Bookings`
        } else {
          this.pageTitle = 'All Bookings'
        }
        break
      default:
        this.pageTitle = ''
        break
    }
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
            this.menuItems = this.sidebarMenu.filter(
              (tab) =>
                tab.label !== 'Ads' &&
                tab.label !== 'My Business' &&
                tab.label !== 'Subscriptions' &&
                tab.label !== 'Billing Address' &&
                tab.label !== 'Privacy' &&
                tab.label !== 'Notifications' &&
                tab.label !== 'Invoices' &&
                tab.label !== 'Transactions' &&
                tab.label !== 'Notifications Settings' &&
                tab.label !== 'Cancellation Policies settings' &&
                tab.label !== 'Events Management' &&
                tab.label !== 'Manage Coupons' &&
                tab.label !== 'Analytics' &&
                tab.label !== 'All Synced Listing' &&
                tab.label !== 'Synced Listings' &&
                tab.label !== 'Leads transaction history' &&
                tab.label !== 'My Purchases Leads' &&
                tab.label !== 'All Leads',
            )
          } else if (roleGet.user_role == Roles.broker) {
            this.menuItems = this.sidebarMenu.filter((menu) =>
              this.BrokerMenu.includes(menu.label),
            )
          } else if (
            this.userDetail.user_role == Roles.businessOwner &&
            this.userDetail.level_id == '1'
          ) {
            this.menuItems = this.sidebarMenu.filter(
              (tab) =>
                tab.label !== 'Ads' &&
                tab.label !== 'All Synced Listing' &&
                tab.label !== 'Synced Listings'&&  tab.label !== 'Leads transaction history' &&
                tab.label !== 'My Purchases Leads' &&
                tab.label !== 'All Leads',
            )
            return this.menuItems
          } else if (roleGet.user_role == Roles.realEstate) {
            this.menuItems = this.sidebarMenu.filter(
              (tab) =>
                tab.label !== 'Ads' &&
                tab.label !== 'My Business' &&
                tab.label !== 'Subscriptions' &&
                tab.label !== 'Billing Address' &&
                tab.label !== 'Privacy' &&
                tab.label !== 'Notifications' &&
                tab.label !== 'Invoices' &&
                tab.label !== 'Transactions' &&
                tab.label !== 'Notifications Settings' &&
                tab.label !== 'Cancellation Policies settings' &&
                tab.label !== 'Events Management' &&
                tab.label !== 'Manage Coupons' &&
                tab.label !== 'Analytics' &&
                tab.label !== 'My Bookings' &&
                tab.label !== 'Leads transaction history' &&
                tab.label !== 'My Purchases Leads' &&
                tab.label !== 'All Synced Listing' &&
                tab.label !== 'Synced Listings' &&
                tab.label !== 'All Leads',
            )
          } else if (roleGet.user_role == 'subscriber') {
            this.menuItems = this.sidebarMenu.filter(
              (tab) =>
                tab.label !== 'Leads transaction history' &&
                tab.label !== 'My Purchases Leads' &&
                tab.label !== 'All Leads' &&
                tab.label !== 'All Synced Listing' &&
                tab.label !== 'Synced Listings',
            )
          } else {
            this.menuItems = this.sidebarMenu.filter(
              (tab) =>
                tab.label !== 'Leads transaction history' &&
                tab.label !== 'My Purchases Leads' &&
                tab.label !== 'All Leads' &&
                tab.label !== 'All Synced Listing' &&
                tab.label !== 'Synced Listings',
            )
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
    return new Array(this.menuItems.length > 0 ? 0 : 4).fill(null)
  }

  public handleLogout() {
    // this.isAuthenticated = false
    this.sessionservice.clearAuthentication()
    this.router.navigateByUrl('/')
  }
}
