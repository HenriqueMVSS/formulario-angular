import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cep } from '../models/cep.models';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private apiUrl: string = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }
  
  getCep(cep: number): Observable<Cep>{
    const url = `${this.apiUrl}${cep}/json`;

    return  this.http.get<Cep>(url);

  }
}
