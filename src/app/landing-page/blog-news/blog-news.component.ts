import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { blogItem } from '../../core/interfaces';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-blog-news',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, NgFor, MatGridListModule],
  templateUrl: './blog-news.component.html',
  styleUrl: './blog-news.component.scss'
})
export class BlogNewsComponent {

  public blogItem: blogItem[] = [
    {
      img: "/assets/image/Blog-image.svg",
      date: "08.08.2021",
      title: "Lorem ipsum dolor sit amet consectetur.",
      description: "ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co",
      profileImage: "/assets/image/profile-image.svg",
      userName: "By Jennifer Lawrence",
      designation: "Lorem ipsum"
    },
    {
      img: "/assets/image/Blog-image.svg",
      date: "08.08.2021",
      title: "Lorem ipsum dolor sit amet consectetur.",
      description: "ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co",
      profileImage: "/assets/image/profile-image.svg",
      userName: "By Jennifer Lawrence",
      designation: "Lorem ipsum"
    },
    {
      img: "/assets/image/Blog-image.svg",
      date: "08.08.2021",
      title: "Lorem ipsum dolor sit amet consectetur.",
      description: "ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co",
      profileImage: "/assets/image/profile-image.svg",
      userName: "By Jennifer Lawrence",
      designation: "Lorem ipsum"
    },
    {
      img: "/assets/image/Blog-image.svg",
      date: "08.08.2021",
      title: "Lorem ipsum dolor sit amet consectetur.",
      description: "ctetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id coLorem ipsum dolor sit amet consectetur. Sed et sem amet lacus amet. Ut sed lectus id in tristique mi sit egestas. Quis erat auctor id co",
      profileImage: "/assets/image/profile-image.svg",
      userName: "By Jennifer Lawrence",
      designation: "Lorem ipsum"
    }

  ]
}
