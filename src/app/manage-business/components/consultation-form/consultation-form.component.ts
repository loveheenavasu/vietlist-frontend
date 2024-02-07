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
  @ViewChild('monContainer') monContainer!: ElementRef;
  @ViewChild('tueContainer') tueContainer!: ElementRef;
  @ViewChild('wedContainer') wedContainer!: ElementRef;
  @ViewChild('thuContainer') thuContainer!: ElementRef;
  @ViewChild('friContainer') friContainer!: ElementRef;
  @ViewChild('satContainer') satContainer!: ElementRef;
  @ViewChild('sunContainer') sunContainer!: ElementRef;


  
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

  addUI(day: string) {
    console.log("click is working", day)
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
    minusCircleIcon.addEventListener('click', () => this.removeUI(containerDiv, day));

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
    const container = this.getDayContainer(day);
    this.renderer.appendChild(container.nativeElement, containerDiv);
  }

  removeUI(containerDiv: HTMLElement, day: string) {
    console.log("check click is work",day)
    const container = this.getDayContainer(day);
    console.log("conatiner",container)
    this.renderer.removeChild(container.nativeElement, containerDiv);
    // Check if there are no more rows, then display "closed" text
    const rows = container.nativeElement.querySelectorAll('.row');
    if (rows.length === 0) {
      this.renderer.appendChild(container.nativeElement, this.createClosedText());
    }
  }

  createClosedText(): HTMLElement {
    const closedText = this.renderer.createElement('div');
    closedText.innerText = 'Closed';
    return closedText;
  }

  getDayContainer(day: string): ElementRef {
    switch (day) {
      case 'Mon':
        return this.monContainer;
      case 'Tue':
        return this.tueContainer;
      case 'Wed':
        return this.wedContainer;
      case 'Thu':
        return this.thuContainer;
      case 'Fri':
        return this.friContainer;
      case 'Sat':
        return this.satContainer;
      case 'Sun':
        return this.sunContainer;
      default:
        throw new Error(`Invalid day: ${day}`);
    }
  }

}
