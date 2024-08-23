import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {

  public myForm:FormGroup


  constructor (private fb:FormBuilder ){
  this.myForm=this.fb.group({
  gender:['M',Validators.required],
  wantNotifications:[true,Validators.required],
  termsAndConditions:[false,Validators.requiredTrue]
  })
  }
  // onsubmit
  onSave():void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

  }

  
  isValidField(field:string):boolean | null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched

  }

  isValidFieldInArray(formArray:FormArray, index:number):boolean | null{
    return formArray.controls[index].errors
    && formArray.controls[index].touched

  }
}
