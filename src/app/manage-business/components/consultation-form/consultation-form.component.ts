import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [MatSelectModule, MatRadioModule, NgxDropzoneModule, FormsModule],
  templateUrl: './consultation-form.component.html',
  styleUrl: './consultation-form.component.scss',
})
export class ConsultationFormComponent {
  @ViewChild('uiContainer') uiContainer!: ElementRef;
  @Output() formSubmit = new EventEmitter<void>()
  @Input() set consultationData(value: any) {
    
  }
  title = 'dropzone'
  files: File[] = []
  showTimeTable: boolean = false;

  constructor(private http: HttpClient, private renderer: Renderer2) { }


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

  addUI() {
    console.log("click is working")
    // Create container div
    const containerDiv = this.renderer.createElement('div');
    this.renderer.addClass(containerDiv, 'row');
    this.renderer.addClass(containerDiv, 'mt-1');

    // Create input divs
    const inputDiv1 = this.renderer.createElement('div');
    inputDiv1.innerHTML = '<input class="input-control" placeholder="" />';
    const inputDiv2 = this.renderer.createElement('div');
    inputDiv2.innerHTML = '<input class="input-control" placeholder="" />';

    // Create minus circle icon
    const minusCircleIcon = this.renderer.createElement('i');
    this.renderer.addClass(minusCircleIcon, 'fa');
    this.renderer.addClass(minusCircleIcon, 'fa-minus-circle');
    minusCircleIcon.setAttribute('aria-hidden', 'true');
    minusCircleIcon.addEventListener('click', () => this.removeUI(containerDiv));

    // Create column divs
    const colDiv1 = this.renderer.createElement('div');
    this.renderer.addClass(colDiv1, 'col-10');
    this.renderer.addClass(colDiv1, 'd-flex');
    this.renderer.appendChild(colDiv1, inputDiv1);
    this.renderer.appendChild(colDiv1, inputDiv2);

    const colDiv2 = this.renderer.createElement('div');
    this.renderer.addClass(colDiv2, 'col-2');
    this.renderer.appendChild(colDiv2, minusCircleIcon);

    // Append column divs to the container div
    this.renderer.appendChild(containerDiv, colDiv1);
    this.renderer.appendChild(containerDiv, colDiv2);

    // Append the container div to the specified UI container
    this.renderer.appendChild(this.uiContainer.nativeElement, containerDiv);
  }

  removeUI(containerDiv: HTMLElement) {
    this.renderer.removeChild(this.uiContainer.nativeElement, containerDiv);
  }
}
