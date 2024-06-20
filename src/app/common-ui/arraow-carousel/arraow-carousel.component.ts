import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-arraow-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arraow-carousel.component.html',
  styleUrl: './arraow-carousel.component.scss',
})
export class ArraowCarouselComponent {
  @Input('title') title?: string = 'Boost Your Credibility'
  @Input('subTitle') subTitle?: string =
    'Gain trust and credibility among customers by displaying the verified badge next to your business listing.'
  @Input('btnName') btnName?: string = 'Verified Business'
  @Input('cardData') cardData: any[] = [1, 23, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  scroll(direction: string) {
    let widthToScroll = document.getElementById('carousel-item')?.offsetWidth
    console.log(widthToScroll)
    let carouselContentContainer = document.getElementsByClassName(
      'arrow-carousel-content',
    )[0]
    if (carouselContentContainer && widthToScroll) {
      if (direction == 'right') {
        carouselContentContainer.scrollBy({
          left: widthToScroll,
          behavior: 'smooth',
        })
      } else {
        carouselContentContainer.scrollBy({
          left: -widthToScroll,
          behavior: 'smooth',
        })
      }
    }
  }
}
