import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[validateDataDirective]',
  providers:[{
    provide: NG_VALIDATORS,
    useExisting: ValidateDataDirective,
    multi: true
  }]
})
export class ValidateDataDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    
    let dataNascimento = control.value;
    let anoNascimento = new Date(dataNascimento).getFullYear();
    let anoAtual = new Date().getFullYear();
 
    return anoAtual - anoNascimento < 18 ? {'validateDataDirective': true} : null;
  }
}
