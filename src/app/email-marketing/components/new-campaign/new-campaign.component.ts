import { ChangeDetectorRef, Component, Input } from '@angular/core'
import { EmailMarketingServiceService } from '../../service/email-marketing-service.service'
import { MatSelectModule } from '@angular/material/select'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
@Component({
  selector: 'app-new-campaign',
  standalone: true,
  imports: [MatSelectModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-campaign.component.html',
  styleUrl: './new-campaign.component.scss',
})
export class NewCampaignComponent {
  @Input() lists: any
  safeSrc?: SafeResourceUrl
  constructor(
    public service: EmailMarketingServiceService,
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) {
    this.service.GetAllTemplate().subscribe((res) => {
      this.templates = Object.values(res?.data?.templates)
      console.log(
        Object.values(res?.data?.templates),
        'Object.values(res?.data?.templates)',
      )
    })
    this.campaignForm = this._formBuilder.group({
      post_title: ['', Validators.required],
      _mailster_subject: ['', [Validators.required]],
      _mailster_from_name: [
        'vietlist from The Premier Vietnamese Business Director',
        Validators.required,
      ],
      _mailster_from_email: ['social@vietlist.biz', Validators.required],
      post_content: ['', Validators.required],
      _mailster_reply_to: ['social@vietlist.biz', Validators.required],
      _mailster_lists: ['', Validators.required],
    })
  }

  campaignForm: FormGroup
  templates: any

  // public onCategoryChange() {
  //   this.categoriesValue = this.campaignForm.value._mailster_lists
  //   // this.getDefaultCat()
  // }

  addcampaign() {
    this.service.CreateNewCampaign(this.campaignForm.value).subscribe(() => {})
  }
  onChangeSelect() {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.campaignForm.value?.post_content,
    )
    this.cdr.detectChanges()
  }
}
