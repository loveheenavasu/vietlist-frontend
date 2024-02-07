import { MatIconModule } from '@angular/material/icon'
import { Component, HostListener } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
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

  public navItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      active: true,
    },
    {
      label: 'Categories',
      href: '/categories',
    },
    {
      label: 'Add a Business',
      href: '/benefits-of-joining',
    },
    {
      label: 'Blog/News',
      href: '/blog-news',
    },
    {
      label: 'Events',
      href: '/events',
    },
    {
      label: 'Contact Us',
      href: '/contact-us',
    },
  ]

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

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) { }

  public navigateToOtherComponent(link: string) {
    this.router.navigate([link])
  }

  public toggleDropdown(event: Event) {
    event.preventDefault()
  }

  public login() {
    this.router.navigateByUrl('/login')
  }

  public signup() {
    this.router.navigateByUrl('/register')
  }

  public profile() {
    // console.log("chekc ", this.userRole)
    if (this.userRole == Roles.subscriber) {
      this.router.navigateByUrl('/manage-profile')
    } else if (this.userRole == Roles.businessOwner && !this.subscriptionStatus) {
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
    } else if (this.userRole == Roles.businessOwner && this.subscriptionStatus) {
      // console.log("check3")
      this.router.navigateByUrl('/manage-profile')
    }
  }

  public isRouteActive(route: string): boolean {
    return this.router.isActive(route, true)
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
    this.router.navigateByUrl('/')
  }
}