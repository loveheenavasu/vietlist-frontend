import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { FormControlValidationDirective } from '@vietlist/shared';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { AuthService } from 'src/app/auth/service/auth.service';
import { LoaderComponent } from 'src/app/common-ui';
import { BusinessService } from 'src/app/manage-business/service/business.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-webinar-registration',
  standalone: true,
  imports: [  MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormControlValidationDirective,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent,
    NgIf,
    NgxDropzoneModule,],
  templateUrl: './webinar-registration.component.html',
  styleUrl: './webinar-registration.component.scss'
})
export class WebinarRegistrationComponent {
  public webinarForm:FormGroup
  public resourceId:any;

  constructor(
    public matDialogRef: MatDialogRef<WebinarRegistrationComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private businessService:BusinessService
  ) {
    this.resourceId = data.resourceId
    this.webinarForm = this.fb.group({
      name:['',Validators.required],
      email:['',[
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]]
    })
  }

  ngOnInit(){
    this.updateSize()
  }

  public close() {
    this.matDialogRef.close()
  }


  public updateSize(){
    this.matDialogRef.updateSize('600px' , '350px')
  }


  public submit(){
    const body = {
      webinar_id:this.resourceId,
      name:this.webinarForm.value.name,
      email:this.webinarForm.value.email  
    }
    this.businessService.webinarRegistration(body).subscribe({
      next:(res)=>{
        Swal.fire({
          toast: true,
          text:res.message,
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        this.close()
      }
    })
  }
}
