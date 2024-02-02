import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listing-business',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './listing-business.component.html',
  styleUrl: './listing-business.component.scss'
})
export class ListingBusinessComponent {
  public selectedLayout: string = 'grid'

  constructor() { }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }
}
