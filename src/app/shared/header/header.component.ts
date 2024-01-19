import { NavItem } from '../../core/interfaces'
import { Component, HostListener } from '@angular/core'
import { Router } from '@angular/router'
import { NgClass, NgFor } from '@angular/common'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { LoginComponent } from '../../auth'
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgClass, MatMenuModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isCollapsed = true

  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) {}
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(event, 'event')
    // Adjust content layout based on the window size
  }
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

  public navigateToOtherComponent(link: string) {
    this.router.navigate([link])
  }

  public toggleDropdown(event: Event) {
    event.preventDefault()
  }

  public login() {
    this.dialog.open(LoginComponent, {
      width: '38%',
    })
  }

  public register() {
    this.router.navigateByUrl('/register')
  }
}
