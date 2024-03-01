import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Component, HostListener } from '@angular/core'
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router'
import { NgClass, NgFor, NgIf } from '@angular/common'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { LoginComponent } from '../../auth'
import { AuthenticationService, NavItem, Roles } from '@vietlist/shared'
import Swal from 'sweetalert2'


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
  public isDropdownActive: boolean = false;
  public isDropdownActiveEvent: boolean = false;
  // isDropdownActiveEvent!: boolean = false;

  public userInfo:any
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
  ) {
    this.sessionservice.isAuthenticated$.subscribe((res) => {
      this.isAuthenticated = res
    })
    this.sessionservice.userRole.subscribe((res) => {
      this.userRole = res
    })
    this.sessionservice.OnLogOut.subscribe((res:any)=>{
      if(res){
         console.log('check the value')
        this.onLogout()
      }
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
    this.sessionservice.OnLogOut.subscribe((res:any)=>{
      if(res){
         console.log('check the value')
        this.onLogout()
      }
    })
  }

  ngOnInit(){
    this.sessionservice.OnLogOut.next(false)
  }

  public navigateOnAddEvent() {
    this.sessionservice.isAuthenticated$.subscribe((res)=>{
      if(res == true && this.userInfo.user_role == Roles.businessOwner){
        this.router.navigate(['/add-event'])
      }else {
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
  
  toggleDropdownsEvent(){
    this.isDropdownActiveEvent = true;
  }
  toggleDropdownsreset(){
    this.isDropdownActive = false;
  }
  toggleDropdownsreset2(){
    this.isDropdownActiveEvent = false;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {}

  public navigateToOtherComponent(link: string) {
    this.router.navigate([link])
  }

  public toggleDropdown(event: Event) {
    event.preventDefault()
  }

  public login() {
     console.log('test logininnnnnn')
      this.router.navigateByUrl('/login'); // Modify the route to your login page
  
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
  offsetFlag!:boolean
  public onLogout() {
     console.log('test log')
    this.isAuthenticated = false
    this.sessionservice.clearAuthentication()
    this.router.navigateByUrl('/')
    // window.location.reload()
  }
  @HostListener('window:scroll', ['$event']) getScrollHeight(event:any) {
    if(window.pageYOffset> 0 )
     this.offsetFlag = false;
    else
      this.offsetFlag = true;
 }

 setDropdownActiveEvent(active: boolean): void {
  this.isDropdownActiveEvent = active;
}
}