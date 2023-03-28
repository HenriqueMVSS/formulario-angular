import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name:['', Validators.compose([Validators.required, Validators.minLength(2)])],
      nascimento: '',
      telefone: ['', Validators.compose([Validators.required, Validators.pattern(/^([1-9][0-9])?(?:((?:9\d|[0-9])\d{6})\-?(\d{4}))$/)])],
      email: ['', Validators.compose([Validators.required ,Validators.pattern(/\S+@\S+\.\S+/)])],
      cep: '',
      endereco: '',
      bairro: '',
      numero: '',
      complemento: '',
      cidade: '',
      estado: '',
    })
  }

  cadastrar(){
    // if(this.formulario.status == 'VALID'){
      console.log('Formulário enviado');
      console.log(this.formulario.errors)
    // }
  }
}
