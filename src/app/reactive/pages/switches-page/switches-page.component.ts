import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``,
})
export class SwitchesPageComponent {
  public myForm: FormGroup;

  person={
    gender:'M',
    wantNotifications:false
  }

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      gender: ['M', Validators.required],
      wantNotifications: [true, Validators.required],
      termsAndConditions: [false, Validators.requiredTrue],
    });
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors 
      && this.myForm.controls[field].touched
    );
  }
  // onsubmit
  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const {termsAndConditions,...newPerson}=this.myForm.value
    
    this.person=newPerson;
    console.log(this.myForm.value)
    console.log(this.person)
  }

  

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }
}
