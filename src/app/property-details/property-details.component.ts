import { CommonModule } from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Renderer2,
  RendererStyleFlags2,
  ViewChild,
} from '@angular/core'
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared'
import { Subject, firstValueFrom, takeUntil } from 'rxjs'
import { LoaderComponent } from 'src/app/common-ui'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LoaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss',
})
export class PropertyDetailsComponent {
  public propId: any
  public userdetails: any
  public propertyDetails: any
  public isAuthenticated: boolean = false
  public destroy$ = new Subject<void>()

  constructor(
    private authentication: AuthenticationService,
    private homeService: HomepageService,
    private _activatedRoute: ActivatedRoute,
    private loaderService: FullPageLoaderService,
    private router: Router,
    private profile: ProfileService,
  ) {
    this.isAuthenticated = this.authentication.isAuthenticated()
    this._activatedRoute.params.subscribe((res) => {
      console.log(res, 'response')
      this.propId = res['id']
    })
  }

  ngOnInit() {
    if (this.propId) {
      this.getPropertyDetails()
    }
  }

  public homestatus: any
  public hometype: any
  public getPropertyDetails() {
    this.loaderService.showLoader()
    this.profile.getMLSDataById(this.propId).subscribe({
      next: (res) => {
        if (res) {
          console.log(res, 'propertDta')
          this.propertyDetails = res?.data[0]
          const data = this.propertyDetails?.homestatus?.split('_')
          this.homestatus = data?.join(' ')
          const data2 = this.propertyDetails?.hometype?.split('_')
          this.hometype = data2?.join(' ')
          this.loaderService.hideLoader()
        }
      },
      error: (err) => {
        this.loaderService.hideLoader()
      },
    })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
