import { Component } from '@angular/core'

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  template: `<section class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </section> `,
  styles: `
    .spinner-border {
      width: 25px;
      height: 25px;
    }
  `,
})
export class LoaderComponent {}
