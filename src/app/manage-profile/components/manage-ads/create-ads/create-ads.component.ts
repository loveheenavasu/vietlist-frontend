import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';
import { ProfileService } from 'src/app/manage-profile/service/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BusinessService } from 'src/app/manage-business/service/business.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioButton, MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { AuthenticationService, LocalStorageService } from '@vietlist/shared';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from 'src/app/common-ui';
import { COUNTRY_DATA } from '@vietlist/shared';

@Component({
  selector: 'app-create-ads',
  standalone: true,
  imports: [MatSelectModule, MatDatepickerModule,
    MatTabsModule,
    MatRadioModule,
    ReactiveFormsModule,
    LoaderComponent,
    FormsModule],
  templateUrl: './create-ads.component.html',
  styleUrl: './create-ads.component.scss'
})
export class CreateAdsComponent {
  public allSpaces: any[] = []
  public files: File[] = []
  public isImageLoading: boolean = false
  public imagePreviews: any
  public imageUrl: any
  public filesString: any
  public uploadMediaUrl: any
  public selectedBillingValue: string = ''
  public moreOptionsvisible: boolean = false
  public email: string = ''
  public createAdForm!: FormGroup
  public adsTitle: string = ''
  public adsDescription: string = ''
  public startsDateTime: string = ''
  public endsDateTime: string = ''
  public editFormData: any
  public editData: boolean = false
  public adId: any
  public countryList: any
  public selectedCountry: any
  public levelId: any

  public billingModelType = [
    { name: 'Cost per Click', value: 'CPC' },
    { name: 'Cost per Views', value: 'CPV' },
  ]

  constructor(private profileService: ProfileService, private router: Router,
    private businessService: BusinessService,
    private sessionservice: AuthenticationService,
    private route: ActivatedRoute,
    private localstorage: LocalStorageService,
    private fb: FormBuilder) {

    this.countryList = COUNTRY_DATA
    this.route.queryParams.subscribe((params) => {
      this.adId = params['id']
      console.log("check id", this.adId)
    })

    this.createAdForm = this.fb.group({
      buyer_email: [''],
      space_id: [''],
      ad_model: [''],
      title: [''],
      description: [''],
      url: [''],
      img: [''],
      starts: [''],
      startsTime: [''],
      ends: [''],
      endsTime: [''],
      show_in_country: [''],
      capping: ['']
    })

    const data = this.sessionservice.getUserdata()
    const user_email = data?.user_email;
    this.createAdForm.controls['buyer_email'].setValue(user_email);

    this.levelId = this.localstorage.getData('level_id')
  }

  ngOnInit() {
    this.getAllSpaces()
    if (this.adId) {
      this.getAdById()
    }
  }



  public getAdById() {
    this.profileService.getAdById(this.adId).subscribe({
      next: (res) => {
        console.log("check ad by id", res)
        this.editData = true
        this.createAdForm.controls['space_id'].setValue(res.data?.space_id)
        this.createAdForm.controls['ad_model'].setValue(res.data?.ad_model.toUpperCase())
        this.createAdForm.controls['title'].setValue(res.data?.title)
        this.createAdForm.controls['description'].setValue(res.data?.description)
        this.createAdForm.controls['url'].setValue(res.data?.url)
        this.createAdForm.controls['capping'].setValue(res.data?.capping)
      }
    })
  }




  public getAllSpaces() {
    this.profileService.getSpaces().subscribe({
      next: (res) => {
        this.allSpaces = res?.data
      }
    })
  }

  onSelectImage(event: any) {
    this.files.push(...event.target.files);

    const formData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i]);
    }

    this.displayImagePreviews();
  }

  displayImagePreviews() {
    this.isImageLoading = true;
    this.imagePreviews = [];

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const result = e.target.result;
        if (typeof result === 'string') {
          this.imagePreviews.push(result);
        }
      };

      reader.readAsDataURL(file);
    }
    this.businessService.uploadMedia(this.files[0]).subscribe({
      next: (res: any) => {
        this.isImageLoading = false;
        this.imageUrl = res.image_url;
        this.adsTitle = this.createAdForm.value.title
        this.adsDescription = this.createAdForm.value.description
        console.log("check the url", this.imageUrl)
      },
      error: (err: any) => {
        // Handle errors
      },
    });
  }

  removeItem(index: any) {
    this.imagePreviews.splice(index, 1);
  }

  public handleBillingModel(value: string) {
    this.selectedBillingValue = value
    console.log("check select value", value)
  }

  public handleMoreOptions() {
    if (this.moreOptionsvisible) {
      this.moreOptionsvisible = false
    } else {
      this.moreOptionsvisible = true
    }
  }

  public onCountrySelect() {
    this.selectedCountry = this.createAdForm.value.show_in_country
  }
  public onSelectSpace(spaceId: string) {
    console.log("check value", spaceId)
  }
  public convertDateFormat() {
    const startDate = this.createAdForm.value.starts;
    const startTime = this.createAdForm.value.startsTime;
    const endDate = this.createAdForm.value.ends;
    const endTime = this.createAdForm.value.endsTime;

    if (startDate && endDate && startTime && endTime) {
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedStartTime = startTime + ':00';
      const formattedEndDate = endDate.toISOString().split('T')[0];
      const formattedEndTime = endTime + ':00';

      this.startsDateTime = formattedStartDate + ' ' + formattedStartTime;
      this.endsDateTime = formattedEndDate + ' ' + formattedEndTime
    }
  }

  public handleCreateAds() {
    this.convertDateFormat()
    const body = {
      buyer_email: this.createAdForm.value.buyer_email,
      space_id: this.createAdForm.value.space_id,
      ad_model: this.createAdForm.value.ad_model,
      title: this.createAdForm.value.title,
      description: this.createAdForm.value.description,
      url: this.createAdForm.value.url,
      img: this.imageUrl,
      starts: this.startsDateTime,
      ends: this.endsDateTime,
      show_in_country: this.selectedCountry,
      capping: this.createAdForm.value.capping
    }
    console.log("click is work", body)
    this.profileService.createAd(body).subscribe({
      next: (res: any) => {
        console.log("check ad response", res)
      }
    })
  }

  public updateAd() {
    const body = {
      buyer_email: this.createAdForm.value.buyer_email,
      space_id: this.createAdForm.value.space_id,
      ad_model: this.createAdForm.value.ad_model,
      title: this.createAdForm.value.title,
      description: this.createAdForm.value.description,
      url: this.createAdForm.value.url,
      img: this.imageUrl,
      starts: this.startsDateTime,
      ends: this.endsDateTime,
      capping: this.createAdForm.value.capping
    }
    console.log("check update data", body)
    // this.profileService.updateAd(body).subscribe({
    //   next: (res: any) => {
    //     console.log("check update ad response", res)
    //   }
    // })
  }

}
