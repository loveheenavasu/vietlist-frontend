import { MatIconModule } from '@angular/material/icon'
import { Component, HostListener } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { NgClass, NgFor, NgIf } from '@angular/common'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { LoginComponent } from '../../auth'
import { LocalStorageService, NavItem } from '@vietlist/shared'
import { UserSessionService } from 'src/app/shared/utils/services/user-session.service'
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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isCollapsed = true
  public isLoginSuccess: boolean = false
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

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userSessionService: UserSessionService,
    private localStorage: LocalStorageService
  ) {
    this.userSessionService.isSuccessLogin.subscribe(val => {
      const isToken = this.localStorage.getData("vietlist::session")
      if(isToken){
      this.isLoginSuccess = true || val
      }
    })

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(event, 'event')
    // Adjust content layout based on the window size
  }

  isSearchInputVisible: boolean = false



  public navigateToOtherComponent(link: string) {
    this.router.navigate([link])
  }

  public toggleDropdown(event: Event) {
    event.preventDefault()
  }

  public login() {
    this.router.navigateByUrl('/login')
  }

  public register() {
    this.router.navigateByUrl('/register')
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true)
  }
  public isTranslationVisible: boolean = false

  // Toggle the visibility when the language is clicked

  public handleSearchFiled() {
    if (this.isSearchInputVisible) {
      this.isSearchInputVisible = false
    } else {
      this.isSearchInputVisible = true
    }
  }

  public logout() {

    this.localStorage.clearData()
    this.router.navigateByUrl("/")
    this.userSessionService.isSuccessLogin.next(false)
  }
}