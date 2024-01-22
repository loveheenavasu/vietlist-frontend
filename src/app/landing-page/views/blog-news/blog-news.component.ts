import { Component, HostListener } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { NgClass, NgFor } from '@angular/common'
import { blogItem } from '@vietlist/shared';

@Component({
  selector: 'app-blog-news',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    NgFor,
    MatGridListModule,
    NgClass,
  ],
  templateUrl: './blog-news.component.html',
  styleUrl: './blog-news.component.scss',
})
export class BlogNewsComponent {
  public orderValue?: number

  constructor() {}
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.orderValue = window.innerWidth < 769 ? 2 : 1
  }

  public blogItem: blogItem[] = [
    {
      img: '/assets/image/Blog-image.svg',
      date: '08.08.2021',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co',
      profileImage: '/assets/image/profile-image.svg',
      userName: 'By Jennifer Lawrence',
      designation: 'Lorem ipsum',
    },
    {
      img: '/assets/image/Blog-image.svg',
      date: '08.08.2021',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co',
      profileImage: '/assets/image/profile-image.svg',
      userName: 'By Jennifer Lawrence',
      designation: 'Lorem ipsum',
    },
    {
      img: '/assets/image/Blog-image.svg',
      date: '08.08.2021',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co',
      profileImage: '/assets/image/profile-image.svg',
      userName: 'By Jennifer Lawrence',
      designation: 'Lorem ipsum',
    },
    {
      img: '/assets/image/Blog-image.svg',
      date: '08.08.2021',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co',
      profileImage: '/assets/image/profile-image.svg',
      userName: 'By Jennifer Lawrence',
      designation: 'Lorem ipsum',
    },
  ]
}
