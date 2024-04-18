import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterLink ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public footerPageContent?: any
  public newsLetterSubscribeForm!: FormGroup

  constructor(
    private footerContent: HomepageService,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.newsLetterSubscribeForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    })
  }

  ngOnInit() {
    this.getFooterContent()
  }
  public getFooterContent() {
    this.footerContent.footerContent().subscribe({
      next: (res: any) => {
        this.footerPageContent = res.data
      },
    })
  }

  public subscribeEmailNewsletter() {
    const value = this.newsLetterSubscribeForm.value.email
    const body = {
      email: value,
    }
    this.footerContent.EmailSubscribeNewsletter(body).subscribe({
      next: (res: any) => {
      },
      error: (err: any) => {

      },
    })
  }

  public navigateTo(url:any){
    this.router.navigateByUrl(url)
  }
}
