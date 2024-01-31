import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FooterComponent, FullPageLoader, HeaderComponent } from './common-ui'
import { FullPageLoaderService } from './shared/utils/services/loader.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule ,HeaderComponent, FooterComponent , FullPageLoader],
  template: `
    <app-header></app-header>
    <app-fullpage-loader *ngIf="loaderVisible == true"></app-fullpage-loader>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'vietlist-frontend'

 
  loaderVisible:boolean = false;

  constructor(private loaderService: FullPageLoaderService) {}

  ngOnInit() {
this.loaderService.getLoaderVisibility().subscribe((res)=>{
  this.loaderVisible = res
      console.log(res)
    });
    console.log(this.loaderVisible )
  }
}
