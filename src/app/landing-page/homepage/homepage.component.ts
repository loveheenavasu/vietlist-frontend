
import { Component } from '@angular/core'
import { BuisnessCategoryComponent } from '../buisness-category/buisness-category.component'
import { BlogNewsComponent } from '../blog-news/blog-news.component'

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [BuisnessCategoryComponent, BlogNewsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  logos: string[] = [
    'logo1.png',
    'logo2.png',
    'logo3.png',
    // Add more logo URLs as needed
  ]
  currentLogoIndex = 0

  constructor() { }

  ngOnInit(): void { }

  nextLogo() {
    this.currentLogoIndex = (this.currentLogoIndex + 1) % this.logos.length
    console.log(this.currentLogoIndex)
  }

  prevLogo() {
    this.currentLogoIndex =
      (this.currentLogoIndex - 1 + this.logos.length) % this.logos.length
  }
}
