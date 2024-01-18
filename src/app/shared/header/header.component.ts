import { Component } from '@angular/core'
import { navItem } from '../../utils/Interface/header-nav'
import { Router } from '@angular/router';
import { NgClass, NgFor } from '@angular/common'
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgClass, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {


  constructor(private router: Router) {

  }

  navItems: navItem[] = [
    {
      label: "Home",
      href: "/",
      active: true,
    },
    {
      label: "Categories",
      href: "/categories",

    },
    {
      label: "Add a Business",
      href: "/add-a-business",

    },
    {
      label: "Blog/News",
      href: "/blog-news",

    },
    {
      label: "Events",
      href: "/events",

    },
    {
      label: "Contact Us",
      href: "/contact-us",
    },

  ]

  navigateToOtherComponent(link: string) {
    console.log("link==>", link)
    this.router.navigate([link]);
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
  }



}
