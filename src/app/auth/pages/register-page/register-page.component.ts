import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';
import { ValidatorService } from '../../../shared/service/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email.validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  public myForm:FormGroup
  
  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorService,
    private email:EmailValidatorService
  ){
    this.myForm=this.fb.group({
      name:['',[Validators.required,Validators.pattern(this.validatorService.firstNameAndLastnamePattern )]],
      email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern )], [ this.email ]],
      username:['',[Validators.required,this.validatorService.cantBeStrider]],
      password:['',[Validators.required,Validators.minLength(6)]],
      password2:['',[Validators.required]],
    }
    ,{
      validators:[
        this.validatorService.isFieldOneEqualTwo('password','password2')
      ]
    }
  )

   
    
  }
  isValidField(field:string){
    //TODO obtener la validacion desde un servicio

    return this.validatorService.isValidField(this.myForm,field)
  }

  onSubmit():void{
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value)
    
  }

}
