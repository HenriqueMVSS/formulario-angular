import { CepService } from './../services/cep.service';
import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Directive({
  selector: '[validarCep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidarCepDirective,
    multi: true
  }]
})
export class ValidarCepDirective implements AsyncValidator{

  constructor(private cepService: CepService) { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;
    
    return this.cepService.getCep(cep).pipe(map((result:any)=> result.erro ? {'validarCep':true} : null))
  }


}
