import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select'
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha'
import { NgxDropzoneModule } from 'ngx-dropzone'

@Component({
  selector: 'app-promotions-form',
  standalone: true,
  imports: [
    MatCheckboxModule,
    NgxDropzoneModule,
    MatSelectModule,
    RecaptchaFormsModule,
    RecaptchaModule,
  ],
  templateUrl: './promotions-form.component.html',
  styleUrl: './promotions-form.component.scss',
})
export class PromotionsFormComponent {
  title = 'dropzone'
  files: File[] = []

  constructor(private http: HttpClient) {}

  onSelect(event: any) {
    console.log(event)
    this.files.push(...event.addedFiles)

    const formData = new FormData()

    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i])
    }

    this.http
      .post('http://localhost:8001/upload.php', formData)
      .subscribe((res: any) => {
        console.log(res)
        alert('Uploaded Successfully.')
      })
  }

  resolved(captchaResponse: string | null) {
    console.log(`Resolved captcha with response: ${captchaResponse}`)
  }
}
