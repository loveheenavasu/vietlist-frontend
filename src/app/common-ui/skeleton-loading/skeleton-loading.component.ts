import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-skeleton-loading',
  standalone: true,
  imports: [],
  template: `<div>
    <span class="skeleton-loader" [style.height]="height"></span>
  </div>`,
  styles: `
    .skeleton-loader {
      width: 100%;
      height: 15px;
      display: block;
      background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0.5) 50%,
          rgba(255, 255, 255, 0) 80%
        ),
        rgb(233, 233, 233);
      background-repeat: repeat-y;
      background-size: 50px 500px;
      background-position: 0 0;
      animation: shine 1s infinite;
    }

    @keyframes shine {
      to {
        background-position:
          100% 0,
          /* move highlight to right */ 0 0;
      }
    }
  `,
})
export class SkeletonLoadingComponent {
  @Input() height: string = ''
}
