import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-restaurants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-restaurants.component.html',
  styleUrl: './top-restaurants.component.scss'
})
export class TopRestaurantsComponent {
  agents = [
    {
      name: 'Suman kumar',
      image: 'https://t4.ftcdn.net/jpg/02/94/26/33/360_F_294263329_1IgvqNgDbhmQNgDxkhlW433uOFuIDar4.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    },
    {
      name: 'Suman kumar',
      image: 'https://t4.ftcdn.net/jpg/02/94/26/33/360_F_294263329_1IgvqNgDbhmQNgDxkhlW433uOFuIDar4.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    },
    {
      name: 'Suman kumar',
      image: 'https://t4.ftcdn.net/jpg/02/94/26/33/360_F_294263329_1IgvqNgDbhmQNgDxkhlW433uOFuIDar4.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    },
    {
      name: 'Suman kumar',
      image: 'https://t4.ftcdn.net/jpg/02/94/26/33/360_F_294263329_1IgvqNgDbhmQNgDxkhlW433uOFuIDar4.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    }
  ];
}
