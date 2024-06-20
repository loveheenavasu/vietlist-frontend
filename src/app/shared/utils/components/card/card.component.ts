import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'
import { TruncateHtmlPipe } from '../../truncate.pipe'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TruncateHtmlPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="agent-card">
      <div class="agent-img">
      <img [src]="imageUrl ? imageUrl : '/assets/image/no-image.webp'"/>
      </div>
      <div class="agent-content">
      <h3 [innerHtml]="title | truncateHtml: 84"></h3>
        <p [innerHtml]="description | truncateHtml: 120"></p>
      </div>
      <div class="view-profile-div">
        <button class="btn black-bg-btn">{{ buttonText }}</button>
      </div>
    </div>

    <br />
    
  `,
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() heading: any
  @Input() subheading: string = ''
  @Input() title: any
  @Input() imageUrl: any
  @Input() description: any
  @Input() buttonText: any
  @Input() viewMoreBtn: any

  // getContent(cardItem: any, contentKey: string): string {
  //   return cardItem[contentKey];
  // }
}
