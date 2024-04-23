import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'app-fullpage-loader',
  standalone: true,
  imports: [CommonModule],
  template: ` <div
    id="pause"
    class="d-flex align-items-center justify-content-center"
  >
    <div id="spinner"></div>
  </div>`,
  styles: `
    #spinner {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: inline-block;
      border-top: 4px solid #fff;
      border-right: 4px solid transparent;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }
    #spinner::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 0;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border-bottom: 4px solid #f89705;
      border-left: 4px solid transparent;
    }
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes frames {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
      }
    }

    #pause {
      display: block;
      background: rgba(0, 0, 0, 0.66) no-repeat 0 0;
      width: 100%;
      height: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1001;
    }
  `,
})
export class FullPageLoader {}
