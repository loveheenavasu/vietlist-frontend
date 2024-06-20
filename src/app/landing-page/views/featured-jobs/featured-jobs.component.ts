import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-jobs.component.html',
  styleUrl: './featured-jobs.component.scss'
})
export class FeaturedJobsComponent {
  agents = [
    {
      name: 'Frontend Developer',
      image: 'assets/images/agent1.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    },
    {
      name: 'Frontend Developer',
      image: 'assets/images/agent2.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    },
    {
      name: 'Frontend Developer',
      image: 'assets/images/agent3.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    },
    {
      name: 'Frontend Developer',
      image: 'assets/images/agent4.jpg',
      phone: '7654832901',
      profileLink: '/agent-profile' // Update with actual profile URL
    }
  ];
}
