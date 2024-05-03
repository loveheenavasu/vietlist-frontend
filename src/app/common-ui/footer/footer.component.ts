import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthenticationService } from '@vietlist/shared'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
import Swal from 'sweetalert2'

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
  public userDetail:any;
  
  constructor(
    private footerContent: HomepageService,
    private fb: FormBuilder,
    private router:Router,
    private sessionservice:AuthenticationService
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

    this.sessionservice.userDetailResponse.subscribe((res)=>{
      this.userDetail = res;
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
        Swal.fire({
          toast: true,
          text: res.message,
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        this.newsLetterSubscribeForm.get('email')?.setValue(null)
      },
      error: (err: any) => {
    this.newsLetterSubscribeForm.get('email')?.setValue(null)
      },
    })
  }

  public navigateTo(url:any){
    this.router.navigateByUrl(url)
  }
}
