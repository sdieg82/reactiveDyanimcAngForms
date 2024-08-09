import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { log } from 'console';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {
  
  public myForm: FormGroup;

  isValidField(field:string):boolean | null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched

  }

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['',[
        Validators.required,
        Validators.minLength(3)
      ]],
      price: [0,
        [Validators.required,
          Validators.min(0)
        ]],
      inStorage: [0,[
        Validators.required,
        Validators.min(0)
      ]]
    });
  }

  getFieldError(field:string):string | null{
      if(!this.myForm.controls[field]) return null 
      const errors=this.myForm.controls[field].errors || {}
      for(const key of Object.keys(errors)){
        switch (key) {
          case 'required': 
            return 'Este campo es requerido'
            
            break;
          
            case 'minlength': 
            return `Mínimo  ${errors['minlength'].requiredLength} caracters.`
            
            break;
        
        
          default:
            break;
        }
      }
      return null;
    }
  ngOnInit(): void {
  }
  onSave():void{
    if(this.myForm.invalid) return
  }
}