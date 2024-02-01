import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { DndDropEvent, DndModule } from 'ngx-drag-drop'
import { NgxDropzoneModule } from 'ngx-dropzone'

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [DndModule, NgxDropzoneModule],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.scss',
})
export class SubscriptionFormComponent {
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

  onRemove(event: any) {
    console.log(event)
    this.files.splice(this.files.indexOf(event), 1)
  }
}
