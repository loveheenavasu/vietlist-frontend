import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import Swal from 'sweetalert2'
import { BusinessService } from '../../service/business.service'
import { LocalStorageService } from '@vietlist/shared'
import { LoaderComponent } from 'src/app/common-ui'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [MatSelectModule, MatRadioModule, NgxDropzoneModule, FormsModule, ReactiveFormsModule, LoaderComponent, CommonModule],
  templateUrl: './consultation-form.component.html',
  styleUrl: './consultation-form.component.scss',
})
export class ConsultationFormComponent {
  @ViewChild('uiContainer') uiContainer!: ElementRef;
  @Output() consultationFormSubmit = new EventEmitter<void>()
  @Input() set consultationData(value: any) {

  }
  daysName:any
  startTime:any
  endTime:any
  jsonString:any
  title = 'dropzone'
  clearTable = false
  files: File[] = []
  imagePreviews: any;
  showTimeTable: boolean = false;
  public ConsultationForm!: FormGroup
  public isLoader: boolean = false
  postId: any
  isLastRemoved: boolean[] = [];
  constructor(private http: HttpClient, private renderer: Renderer2, private fb: FormBuilder, private businessService: BusinessService,

    private localstorage: LocalStorageService,) {
      this.isLastRemoved = new Array<boolean>(this.days.length).fill(false)
    this.ConsultationForm = this.fb.group({
      consultation_booking_link: [''],
      consultation_mode: [''],
      consultation_description: [''],
      services_list: [''],
      price: [''],
      video_upload: [''],
      video_url: [''],
      business_hours: [''],
      special_offers: ['', Validators.required]
    })
    const id = localstorage.getData('postId')
    this.postId = Number(id)
  }
  onSelect(event: any) {
    const files: File[] = event.addedFiles;

    // Filter out only video files
    const videoFiles: File[] = files.filter(file => file.type.startsWith('video/'));

    // If there are any image files, you can remove them
    const imageFiles: File[] = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      // Handle the presence of image files (disable or display a message)
      Swal.fire({
        toast: true,
        text: 'Image files are not allowed. Please upload only video files.',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      console.log('Image files are not allowed. Please upload only video files.');
    }

    // Handle the uploaded video files
    videoFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const videoUrl = reader.result as string;

        // Declare the video variable
        const video: HTMLVideoElement = document.createElement('video');
        video.src = videoUrl;
        video.controls = true; // Add controls to the video element
        video.width = 320; // Set the width of the video element
        video.height = 240;  // Set the height of the video element
        video.style.cssText = `
        margin:10px; 
        object-fit:cover;
        `
        // Create the video container
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-preview'); // Add a class for styling purposes

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove_button')
        removeButton.textContent = 'Remove';
        removeButton.style.cssText = `
  background: orange;
  display: block;
  width: 94.7%;
  margin: auto;
  color: #fff;
  border: 0;
  margin-top: -12px;
`;

        removeButton.addEventListener('click', () => {
          this.onRemove(videoElement);
        });

        videoElement.appendChild(video);
        videoElement.appendChild(removeButton);

        // Get the video container element
        const videoContainer = document.getElementById('video-preview-container');

        // Ensure that the video container exists before appending the video element
        if (videoContainer) {
          videoContainer.appendChild(videoElement);
        } else {
          console.error('Video preview container not found.');
        }
      };
      reader.readAsDataURL(file);
    });
  }



  onRemove(videoElement: HTMLElement) {
    if (videoElement && videoElement.parentNode) {
      videoElement.parentNode.removeChild(videoElement);
    }
  }
  // public onRemove() {
  //   console.log(this.videoContainer)
  //   this.videoContainer.splice(this.videoContainer.indexOf(this.videoContainer), 1)
  // }
  onSelectImage(event: any) {
    this.files.push(...event.addedFiles)

    const formData = new FormData()

    for (var i = 0; i < this.files.length; i++) {
      console.log(this.files[i], 'this.files[i]')
      formData.append('file[]', this.files[i])
    }
    this.displayImagePreviews();
  }
  displayImagePreviews() {
    // Assuming you have an array to store image URLs for preview
    this.imagePreviews = [];

    // Loop through each file
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const reader = new FileReader();

      // Read the file as a data URL
      reader.readAsDataURL(file);

      // Define the onload event handler
      reader.onload = () => {
        // Cast reader.result to string
        const result = reader.result as string;

        // Push the data URL (image preview) to the array
        this.imagePreviews.push(result);
      };
    }
  }

  // addUI() {
  //   console.log("click is working")
  //   // Create container div
  //   const containerDiv = this.renderer.createElement('div');
  //   this.renderer.addClass(containerDiv, 'row');
  //   this.renderer.addClass(containerDiv, 'mt-1');

  //   // Create input divs
  //   const inputDiv1 = this.renderer.createElement('div');
  //   inputDiv1.innerHTML = '<input class="input-control" placeholder="" />';
  //   const inputDiv2 = this.renderer.createElement('div');
  //   inputDiv2.innerHTML = '<input class="input-control" placeholder="" />';

  //   // Create minus circle icon
  //   const minusCircleIcon = this.renderer.createElement('i');
  //   this.renderer.addClass(minusCircleIcon, 'fa');
  //   this.renderer.addClass(minusCircleIcon, 'fa-minus-circle');
  //   minusCircleIcon.setAttribute('aria-hidden', 'true');
  //   minusCircleIcon.addEventListener('click', () => this.removeUI(containerDiv));

  //   // Create column divs
  //   const colDiv1 = this.renderer.createElement('div');
  //   this.renderer.addClass(colDiv1, 'col-10');
  //   this.renderer.addClass(colDiv1, 'd-flex');
  //   this.renderer.appendChild(colDiv1, inputDiv1);
  //   this.renderer.appendChild(colDiv1, inputDiv2);

  //   const colDiv2 = this.renderer.createElement('div');
  //   this.renderer.addClass(colDiv2, 'col-2');
  //   this.renderer.appendChild(colDiv2, minusCircleIcon);

  //   // Append column divs to the container div
  //   this.renderer.appendChild(containerDiv, colDiv1);
  //   this.renderer.appendChild(containerDiv, colDiv2);

  //   // Append the container div to the specified UI container
  //   this.renderer.appendChild(this.uiContainer.nativeElement, containerDiv);
  // }

  // removeUI(containerDiv: HTMLElement) {
  //   this.renderer.removeChild(this.uiContainer.nativeElement, containerDiv);
  // }

  days = [
    { name: 'Mon', times: [{ start: '', end: '' }] },
    { name: 'Tue', times: [{ start: '', end: '' }] },
    { name: 'Wed', times: [{ start: '', end: '' }] },
    { name: 'Thu', times: [{ start: '', end: '' }] },
    { name: 'Fri', times: [{ start: '', end: '' }] },
    { name: 'Sat', times: [{ start: '', end: '' }] },
    { name: 'Sun', times: [{ start: '', end: '' }] }
  ];

  addTime(dayIndex: number) {
    console.log(dayIndex , "dayIndex")
    this.days[dayIndex].times.push({ start: '', end: '' });
  }
  selectedWeek: string[] = [];
  onWeekSelect(dayName: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    
    if (checked) {
      this.selectedWeek.push(dayName);
    } else {
      this.selectedWeek = this.selectedWeek.filter(day => day !== dayName);
    }
  }
 
  onSubmit() {
    const selectedDaysData = this.days.filter(day => this.selectedWeek.includes(day.name));
    const jsonData: string[] = []; // Explicitly declare the type as string[]
  
    selectedDaysData.forEach(day => {
      const dayData = day.times.map(time => `${day.name} ${time.start}-${time.end}`);
      jsonData.push(...dayData);
    });
  
    // Convert the jsonData array to JSON format
    this.jsonString = JSON.stringify(jsonData);
  
    console.log(this.jsonString);
  }
  

  removeTime(dayIndex: number, timeIndex: number) {
    this.days[dayIndex].times.splice(timeIndex, 1);
  
    this.isLastRemoved[dayIndex] = this.days[dayIndex].times.length === 0;
  }





  public addBusiness(): void {
    this.isLoader = true
    const body = {
      // consultation_booking_link: [''],
      // consultation_mode: [''],
      // consultation_description: [''],
      // services_list: [''],
      // price: [''],
      // video_upload: [''],
      // video_url: [''],
      // business_hours: [''],
      // special_offers: ['', Validators.required]
      post_id: this.postId,
      consultation_booking_link: this.ConsultationForm.value.consultation_booking_link,
      consultation_mode: this.ConsultationForm.value.consultation_mode,
      consultation_description: this.ConsultationForm.value.consultation_description,
      services_list: this.ConsultationForm.value.services_list,
      price: this.ConsultationForm.value.price,
      video_url: this.ConsultationForm.value.video_url,
      business_hours: this.jsonString,
      special_offers: this.ConsultationForm.value.special_offers,
      // video_upload: this.ConsultationForm.value.price,
    }
    console.log(body, 'hjgjhghjggjhghghggggh')
    return
    this.businessService.addBusiness(body).subscribe({
      next: (res: any) => {
        if (res) {
          this.isLoader = false
          this.consultationData.emit()
          Swal.fire({
            toast: true,
            text: 'Successfully added Business bio details.',
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
        }
      },
    })
  }

}
