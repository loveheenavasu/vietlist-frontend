import { MatIconModule } from '@angular/material/icon'
import { Component, HostListener } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { NgClass, NgFor, NgIf } from '@angular/common'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { LoginComponent } from '../../auth'
import { AuthenticationService, NavItem } from '@vietlist/shared'

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
      href: '/add-a-business',
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
    this.router.navigateByUrl('/login')
  }

  public signup() {
    this.router.navigateByUrl('/register')
  }

  public profile() {}

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
    this.sessionservice.clearAuthentication()
    this.router.navigateByUrl('/')
  }
}
