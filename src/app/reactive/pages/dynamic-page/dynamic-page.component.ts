import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',  // Agrega un selector si lo necesitas
  templateUrl: './dynamic-page.component.html',  // Agrega estilos si los tienes
})
export class DynamicPageComponent {

  public myForm: FormGroup;
  public newFavorite: FormControl=new FormControl('',Validators.required);

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      favoriteGames: this.fb.array([
        ['Metal Gear',Validators.required],
        ['Death Stranding',Validators.required],
      ])
    });
  }

  isValidField(field:string):boolean | null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched

  }

  isValidFieldInArray(formArray:FormArray, index:number):boolean | null{
    return formArray.controls[index].errors
    && formArray.controls[index].touched

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

  onDeleteFavorite(index:number):void{
    this.favoriteGames.removeAt(index)
  }

  onAddToFavorites(): void {
    if (this.newFavorite.invalid) return;
  
    // Obtén el valor del nuevo favorito
    const newFavoriteValue = this.newFavorite.value;
  
    // Añade el nuevo favorito al array de favoritos
    this.favoriteGames.push(this.fb.control(newFavoriteValue, Validators.required));
  
    // Resetea el formulario para permitir nuevas entradas
    this.newFavorite.reset();
  }
  
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  addGame(game: string): void {
    this.favoriteGames.push(this.fb.control(game));
  }

  removeGame(index: number): void {
    this.favoriteGames.removeAt(index);
  }
 
  onSubmit():void{
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return;

    }
    (this.myForm.controls['favoriteGames'] as FormArray) =this.fb.array([]);
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
