import { BuisnessCategoryComponent } from './../buisness-category/buisness-category.component';
import { Component } from '@angular/core'

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [BuisnessCategoryComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
