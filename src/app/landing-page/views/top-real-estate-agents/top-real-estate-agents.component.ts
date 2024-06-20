import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-real-estate-agents',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './top-real-estate-agents.component.html',
  styleUrl: './top-real-estate-agents.component.scss'
})
export class TopRealEstateAgentsComponent {
  agents = [
    {
      name: 'Suman kumar',
      image: 'assets/images/agent1.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    },
    {
      name: 'Suman kumar',
      image: 'assets/images/agent2.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    },
    {
      name: 'Suman kumar',
      image: 'assets/images/agent3.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    },
    {
      name: 'Suman kumar',
      image: 'assets/images/agent4.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    }
  ];
}