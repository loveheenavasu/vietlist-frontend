import { FormGroup } from '@angular/forms';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFormSubmit]',
  standalone: true
})
export class FormSubmitDirective {
  @Input() validationControl!:FormGroup

  @HostListener('click' , ["$event"])
  handleClickEvent(event:any){
    this.markAsTouched (this.validationControl)
  }
 private markAsTouched(formGroup:FormGroup):void{
  formGroup.markAllAsTouched();
  formGroup.updateValueAndValidity();
  (<any>Object).values(formGroup.controls).forEach((control:any)=>{
    control.markAllAsTouched();
    control.updateValueAndValidity({onlySelf:false,emitEvent:true});
    if(control.controls){
      this.markAsTouched(control)
    }
  })
 }

}

