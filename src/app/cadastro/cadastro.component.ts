import { CepService } from "./../services/cep.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cepService: CepService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      nascimento: ["", Validators.compose([Validators.required])],
      telefone: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^([1-9][0-9])?(?:((?:9\d|[0-9])\d{6})\-?(\d{4}))$/
          ),
        ]),
      ],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/\S+@\S+\.\S{2}/),
        ]),
      ],
      cep: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      endereco: ["", Validators.compose([Validators.required])],
      bairro: ["", Validators.compose([Validators.required])],
      numero: ["", Validators.compose([Validators.required])],
      complemento: "",
      cidade: ["", Validators.compose([Validators.required])],
      estado: ["", Validators.compose([Validators.required])],
    });
  }

  buscarCep() {
    let cep = this.formulario.value.cep;
    if (cep.length == 8) {
      this.cepService.getCep(cep).subscribe((result) => {
          if(result.cep){
            this.formulario.controls['cep'].setValue(result.cep.replace("-", ""));  
            this.formulario.controls['endereco'].setValue(result.logradouro);
            this.formulario.controls['bairro'].setValue(result.bairro);
            this.formulario.controls['cidade'].setValue(result.localidade);
            this.formulario.controls['estado'].setValue(result.uf);    
          }
      }),
      (error: any) => console.log(error);
    }
  }

  btnDisabled() {
    if(this.formulario.valid) {
      return 'formulario__botao';
    } 

    return 'formulario__botao__disabled';
  }

  cadastrar() {
    console.log("Formulário enviado");
    console.log(this.formulario.errors);
  }
}
