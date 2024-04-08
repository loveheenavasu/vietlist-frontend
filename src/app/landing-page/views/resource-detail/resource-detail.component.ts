import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { FullPageLoaderService } from '@vietlist/shared'

@Component({
  selector: 'app-resource-detail',
  standalone: true,
  imports: [],
  templateUrl: './resource-detail.component.html',
  styleUrl: './resource-detail.component.scss',
})
export class ResourceDetailComponent {
  constructor(
    public _activatedRoute: ActivatedRoute,
    public homeService: HomepageService,
    private loaderService: FullPageLoaderService,
  ) {
    this._activatedRoute.params.subscribe((res) => {
      console.log(res['id'], 'res[id]')
      this.resourceId = res['id']
    })
    this.getResourceDetails()
  }
  public resourceId: number = 0
  public resourceDetails: any

  public getResourceDetails() {
    this.loaderService.showLoader()
    this.homeService.getResourceDetails(this.resourceId).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res?.data, 'res?.data')
          this.resourceDetails = res?.data
          this.loaderService.hideLoader()
        }
      },
      error: (err: any) => {
        this.loaderService.hideLoader()
      },
    })
  }
}
