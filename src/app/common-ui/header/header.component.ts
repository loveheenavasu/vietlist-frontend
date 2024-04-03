
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core'
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
import { AuthenticationService, NavItem, Roles } from '@vietlist/shared'
import Swal from 'sweetalert2'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { AuthService } from 'src/app/auth/service/auth.service'
import { errorMessageSubject } from '../../shared/utils/interceptor/errorhandler';
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { interval, Subscription } from 'rxjs'

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
    AutocompleteComponent
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
  public selectedCategory: any
  public post_category: any[] = []
  public street: any
  public state: any
  public country: any
  public city: any
  public zipcode: any
  public fullAddress: any
  public longitude: any
  public latitude: any
  public isDropdownActive: boolean = false;
  public isDropdownActiveEvent: boolean = false;
  public notificationsArr :any[]=[]
  private notificationIntervalSubscription: Subscription | undefined;
  public roles = Roles
  public userInfo: any
  public offsetFlag!: boolean
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
    private homeService:HomepageService
  ) {
    this.sessionservice.isAuthenticated$.subscribe((res) => {
      this.isAuthenticated = res
    })
    this.sessionservice.userRole.subscribe((res) => {
      this.userRole = res
    })

    const data = this.sessionservice.getUserdata()
    // console.log("check role1", data)
    if (data) {
      this.userRole = data?.user_role
      // console.log("check role", data)
    }
    this.sessionservice.isSubscription$.subscribe((res) => {
      this.subscriptionStatus = res
      // console.log("check the subscription status", this.subscriptionStatus)
    })
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isSearchInputVisible = false
      }
    })
    errorMessageSubject.subscribe((res:any)=>{
        if(res){
          this.onLogout()
        }
    })
    this.sessionservice.OnLogOut.subscribe((res: any) => {
      if (res) {
        console.log('check the value')
        this.onLogout()
      }
    })
  }



  ngOnInit() {
    this.sessionservice.OnLogOut.next(false)
    this.getBusinessCat()
    if(this.isAuthenticated){
      this.getNotifications()
      this.startNotificationInterval()
    }
  }

  public login() {
    this.authService.isLoggedIn = false
    console.log("login clicked !")
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
          timer: 3000,
          timerProgressBar: true,
        })
        // this.router.navigateByUrl('/manage-profile')
      }
    })
  }


  toggleDropdowns() {
    this.isDropdownActive = true;
  }

  toggleDropdownsEvent() {
    this.isDropdownActiveEvent = true;
  }
  toggleDropdownsreset() {
    this.isDropdownActive = false;
  }
  toggleDropdownsreset2() {
    this.isDropdownActiveEvent = false;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) { }

  public navigateToOtherComponent(link: string) {
    this.router.navigate([link])
  }

  public toggleDropdown(event: Event) {
    event.preventDefault()
  }


  public signup() {
    this.router.navigateByUrl('/register')
  }

  public profile() {
    // console.log("chekc ", this.userRole)
    if (this.userRole == Roles.subscriber) {
      this.router.navigateByUrl('/manage-profile')
    } else if (
      this.userRole == Roles.businessOwner &&
      !this.subscriptionStatus
    ) {
      // console.log("check2")
      Swal.fire({
        toast: true,
        text: 'Please choose plan',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      this.router.navigateByUrl('/subscription-plans')
    } else if (
      this.userRole == Roles.businessOwner &&
      this.subscriptionStatus
    ) {
      // console.log("check3")
      this.router.navigateByUrl('/manage-profile')
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-box')) {
      this.isSearchInputVisible = false;
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
    console.log('test log')
    this.isAuthenticated = false
    this.sessionservice.clearAuthentication()
    this.router.navigate(['/']);
  }

  @HostListener('window:scroll', ['$event']) getScrollHeight(event: any) {
    if (window.pageYOffset > 0)
      this.offsetFlag = false;
    else
      this.offsetFlag = true;
  }
  public getBusinessCat() {
    this.businessService.getBusinessCat().subscribe({
      next: (res: any) => {
        this.post_category = res.data
      },
      error: (err) => { },
    })
  }

  public customSearch(term: string, item: any) {
    term = term.toLowerCase();
    return item.name.toLowerCase().indexOf(term) > -1;
  }
  public onCategoryChange() {

    if (this.selectedCategory) {
      this.router.navigate(['/find-business/', this.selectedCategory?.id])
      this.selectedCategory = null;
    }
  }

  public handleSearch() {
    this.router.navigateByUrl('/find-business');
  }

  public navigatetoNotifications(){
    this.router.navigateByUrl('/notifications')
  }

  public  openMenu(menu: MatMenuTrigger) {
    menu.openMenu();
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
      console.log("check full address", this.fullAddress,)
      // const queryParams: NavigationExtras = { queryParams: { id: this.fullAddress } };
      const location = this.fullAddress
      // Construct query parameters
      const addressParams = {
        country: this.country,
        state: this.state,
        city: this.city,
        street: this.fullAddress,
        zip: this.zipcode
      }
      this.router.navigate(['/find-business-location'], { queryParams: addressParams });
    }
    this.latitude = place.geometry.location.lat()
    this.longitude = place.geometry.location.lng()
  }

  private startNotificationInterval() {
    // Start interval for fetching notifications every minute
    this.notificationIntervalSubscription = interval(60000) // 60000 ms = 1 minute
      .subscribe(() => {
        this.getNotifications();
      });
  }

  notificationsDetails:any;
public getNotifications(){
  this.homeService.getNotification().subscribe({
    next:(res:any)=>{
      this.notificationsDetails = res
      this.notificationsArr = res.data
  
    },
    error:(err)=>{
      
    }
  })
}


  setDropdownActiveEvent(active: boolean): void {
    this.isDropdownActiveEvent = active;
  }
}