import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { switchMap, catchError } from 'rxjs/operators'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { LoaderComponent } from 'src/app/common-ui'

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Component, DestroyRef, HostListener, Renderer2 } from '@angular/core'
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationExtras,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router'
import { NgClass, NgFor, NgIf } from '@angular/common'
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { LoginComponent } from '../../auth'
import {
  AuthenticationService,
  LocalStorageService,
  Roles,
} from '@vietlist/shared'
import Swal from 'sweetalert2'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { AuthService } from 'src/app/auth/service/auth.service'
import { errorMessageSubject } from '../../shared/utils/interceptor/errorhandler'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { EMPTY, interval, Subscription } from 'rxjs'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import { LanguageService } from 'src/app/shared/utils/services/language.service'
import { clearSavedFilter, createSlug } from 'src/app/shared/helper'

declare global {
  interface Window {
    google: any
    googleTranslateElementInit: () => void
  }
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgIf,
    MatMenuModule,
    MatDialogModule,
    RouterLink,
    MatIconModule,
    LoginComponent,
    MatButtonModule,
    RouterLinkActive,
    RouterModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteComponent,
    LoaderComponent,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isCollapsed: boolean = true
  public isLoginSuccess: boolean = false
  public isAuthenticated: boolean = false
  public isSearchInputVisible: boolean = false
  public isTranslationVisible: boolean = false
  public userRole: string = ''
  public subscriptionStatus: boolean = false
  public currentRoute: any
  public post_title: any
  public post_category: any[] = []
  public street: any
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public fullAddress: any
  public longitude: any
  public latitude: any
  public isDropdownActive: boolean = false
  public isDropdownActiveEvent: boolean = false
  public notificationsArr: any[] = []
  private notificationIntervalSubscription!: Subscription
  public isNotificationLoading: boolean = false
  public roles = Roles
  public userInfo: any
  public offsetFlag!: boolean
  public userDetail: any
  /**
   *
   * @param router
   * @param dialog
   * @param sessionservice
   */

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private sessionservice: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private businessService: BusinessService,
    private authService: AuthService,
    private homeService: HomepageService,
    private profileService: ProfileService,
    private localStorage: LocalStorageService,
    private destroyRef: DestroyRef,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private renderer: Renderer2,
  ) {
    this.sessionservice.userDetailResponse.subscribe((res) => {
      this.userDetail = res
    })

    this.sessionservice.isAuthenticated$.subscribe((res) => {
      this.isAuthenticated = res
      if (this.isAuthenticated) {
        this.startNotificationInterval()
      } else {
        this.stopNotificationInterval()
      }
    })

    this.sessionservice.userRole.subscribe((res) => {
      this.userRole = res
    })

    const data = this.sessionservice.getUserdata()
    if (data) {
      this.userRole = data?.user_role
      // console.log("check role", data)
    }
    this.sessionservice.isSubscription$.subscribe((res) => {
      this.subscriptionStatus = res
    })
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isSearchInputVisible = false
      }
    })
    errorMessageSubject.subscribe((res: any) => {
      if (res) {
        this.onLogout()
      }
    })
    this.sessionservice.OnLogOut.subscribe((res: any) => {
      if (res) {
        this.onLogout()
      }
    })
  }

  ngOnInit() {
    this.sessionservice.OnLogOut.next(false)
    this.getBusinessCat()
    if (this.isAuthenticated) {
      this.fetchProfileDetail()
    }
  }

  public fetchProfileDetail() {
    this.profileService.userDetails().subscribe({
      next: (res) => {},
      error: (err: any) => {
        this.router.navigateByUrl('/login')
      },
    })
  }

  public login() {
    this.authService.isLoggedIn = false
    console.log('login clicked !')
    // this.router.navigate(['/login'])
    this.router.navigateByUrl('/login')
  }

  public navigateOnAddEvent() {
    this.sessionservice.isAuthenticated$.subscribe((res) => {
      if (res == true && this.userInfo.user_role == Roles.businessOwner) {
        this.router.navigate(['/add-event'])
      } else {
        Swal.fire({
          toast: true,
          text: 'Signup as a business owner to add events !',
          animation: false,
          icon: 'warning',
          position: 'top-right',
          showConfirmButton: false,
          timer: 10000,
          timerProgressBar: true,
        })
        // this.router.navigateByUrl('/manage-profile')
      }
    })
  }

  toggleDropdowns() {
    this.isDropdownActive = true
  }

  toggleDropdownsEvent() {
    this.isDropdownActiveEvent = true
  }
  toggleDropdownsreset() {
    this.isDropdownActive = false
  }
  toggleDropdownsreset2() {
    this.isDropdownActiveEvent = false
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {}

  public navigateToOtherComponent(link: string) {
    this.router.navigate([link])
  }

  isLangugeDiv: boolean = false
  public toggleDropdown(event: Event) {
    // alert('Hello')
    event.preventDefault()
    this.isLangugeDiv = true
  }

  public signup() {
    this.router.navigateByUrl('/register')
  }

  public profile() {
    if (this.userRole == Roles.subscriber || Roles.broker || Roles.realEstate) {
      this.router.navigateByUrl('/manage-profile')
    } else if (
      this.userRole == Roles.businessOwner &&
      !this.subscriptionStatus
    ) {
      Swal.fire({
        toast: true,
        text: 'Please choose plan',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
      })
      this.router.navigateByUrl('/subscription-plans')
    } else if (
      this.userRole == Roles.businessOwner &&
      this.subscriptionStatus
    ) {
      this.router.navigateByUrl('/manage-profile')
    } else if (this.userRole == Roles.broker) {
      this.router.navigateByUrl('/manage-profile')
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (!target.closest('.search-box')) {
      this.isSearchInputVisible = false
    }
  }

  public handleSearchFiled() {
    if (this.isSearchInputVisible) {
      this.isSearchInputVisible = false
    } else {
      this.isSearchInputVisible = true
    }
  }

  public onLogout() {
    this.isAuthenticated = false
    this.sessionservice.clearAuthentication()
    this.router.navigate(['/'])
    this.stopNotificationInterval()
  }

  @HostListener('window:scroll', ['$event']) getScrollHeight(event: any) {
    if (window.pageYOffset > 0) this.offsetFlag = false
    else this.offsetFlag = true
  }

  public getBusinessCat() {
    this.businessService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.post_category = res.data
      },
      error: (err) => {},
    })
  }

  public customSearch(term: string, item: any) {
    term = term.toLowerCase()
    return item.name.toLowerCase().indexOf(term) > -1
  }
  // public onCategoryChange() {
  //   if (this.selectedCategory) {
  //     this.router.navigate(['/find-business/', post_title])
  //     this.selectedCategory = null
  //   }
  // }

  public handleSearch() {
    clearSavedFilter()
    if (this.post_title) {
      this.router.navigate(['/find-business'], {
        state: {
          title: this.post_title,
        },
      })
    } else {
      this.router.navigateByUrl('/find-business')
    }
  }

  public navigatetoNotifications() {
    this.router.navigateByUrl('/notifications')
  }

  public openMenu(menu: MatMenuTrigger) {
    menu.openMenu()
  }

  public getAddress(place: any) {
    this.fullAddress = place.formatted_address
    this.state = ''
    this.country = ''
    this.city = ''
    this.zipcode = ''
    const array = place
    array.address_components.filter((element: any) => {
      element.types.filter((type: any) => {
        if (type == 'country') {
          this.country = element.long_name
        }
        if (type == 'administrative_area_level_3') {
          this.city = element.long_name
        }
        if (type == 'postal_code') {
          this.zipcode = element.long_name
        }
        if (type == 'administrative_area_level_1') {
          this.state = element.long_name
        }
      })
    })
    if (this.fullAddress) {
      // let formattedName = selectedCategory.name.replace(/&/g, ' ');
      // formattedName = formattedName.replace(/\s+/g, '-');
      // const queryParams: NavigationExtras = { queryParams: { id: this.fullAddress } };
      const location = this.fullAddress
      // Construct query parameters
      const addressParams = {
        country: this.country,
        state: this.state,
        city: this.city,
        street: this.fullAddress,
        zip: this.zipcode,
      }
      clearSavedFilter()
      this.router.navigate(['/find-business-location'], {
        state: {
          title: this.post_title,
          ...addressParams,
        },
      })
    }
    this.latitude = place.geometry.location.lat()
    this.longitude = place.geometry.location.lng()
  }

  private startNotificationInterval(): void {
    this.notificationIntervalSubscription = interval(6000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => {
          this.isNotificationLoading = true
          const body = {
            limit: 10,
          }

          if (!this.localStorage.getData('loginInfo')) {
            this.stopNotificationInterval()
          }
          return this.homeService.getNotification(body).pipe(
            catchError(() => {
              this.isNotificationLoading = false
              this.notificationsDetails = '0'
              this.notificationsArr = []
              return EMPTY
            }),
          )
        }),
      )
      .subscribe({
        next: (res: any) => {
          this.isNotificationLoading = false
          this.notificationsDetails = res.total_count
          this.notificationsArr = res.data
        },
      })
  }

  notifcationStatus: any

  goToPage(item: any) {
    const body = {
      read_type: 'single_read',
      id: item?.id,
    }
    this.homeService.notificationStatus(body).subscribe({
      next: (res) => {
        this.notifcationStatus = res
        let slug = item?.slug
          ? item.slug
          : createSlug(item?.id, item?.post_title)
        if (
          item.notification_type == 'business_listing' ||
          item.notification_type == 'claim_business'
        ) {
          this.router.navigate(['/business-details', slug], {
            state: {
              id: item.id,
            },
          })
        } else if (item.notification_type == 'event_booking') {
          this.router.navigate(['/event-details', slug], {
            state: {
              id: item.id,
            },
          })
        }
      },
    })
  }

  private stopNotificationInterval(): void {
    if (this.notificationIntervalSubscription) {
      this.notificationIntervalSubscription.unsubscribe()
      this.notificationsArr = []
      this.notificationsDetails = ''
    }
  }

  loadGoogleTranslateScript() {
    const script = this.renderer.createElement('script')
    script.type = 'text/javascript'
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    this.renderer.appendChild(document.body, script)
    window['googleTranslateElementInit'] = () => this.loadGoogleTranslate()
  }

  loadGoogleTranslate() {
    if (window['google'] && window['google'].translate) {
      new window['google'].translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,vi',
          layout:
            window['google'].translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element',
      )

      const anchorTag = document.getElementsByClassName(
        'VIpgJd-ZVi9od-xl07Ob-lTBxed',
      )[0]
      const translatorLoader = document.getElementsByClassName(
        'VIpgJd-ZVi9od-aZ2wEe-wOHMyf',
      )[0]

      if (translatorLoader) {
        translatorLoader.remove()
      }

      const popup = document.getElementById('goog-gt-tt')
      if (popup) {
        popup.remove()
      }
      if (anchorTag) {
        anchorTag.addEventListener('click', function (event) {
          event.preventDefault()
        })
      }
    } else {
      console.error('Google Translate script is not loaded.')
    }
  }

  notificationsDetails: any
  public getNotifications() {
    this.isNotificationLoading = true
    const body = {
      limit: 10,
    }
    this.homeService.getNotification(body).subscribe({
      next: (res: any) => {
        this.isNotificationLoading = false
        this.notificationsDetails = res.total_count
        this.notificationsArr = res.data
      },
    })
  }

  setDropdownActiveEvent(active: boolean): void {
    this.isDropdownActiveEvent = active
  }

  public joinDirectory() {
    this.localStorage.removeData('postId')
    this.localStorage.removeData('isSubscriptionFormFilled')
    this.localStorage.removeData('isBusinessFormFilled')
    this.localStorage.removeData('isBusinessBioFormFilled')
    this.localStorage.removeData('isConsultationFormFilled')
  }

  changeLanguage(language: any) {
    // this.languageService.setLanguage(language);
    this.translateService.use(language)
    console.log(language, 'language')
  }

  navigateToAddEvent() {
    if (this.isAuthenticated) {
      this.router.navigateByUrl('/add-event')
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  ngOnDestroy(): void {
    if (this.notificationIntervalSubscription) {
      this.notificationIntervalSubscription.unsubscribe()
    }
    this.stopNotificationInterval()
  }
  ngAfterViewInit() {
    this.loadGoogleTranslateScript()
  }
}
