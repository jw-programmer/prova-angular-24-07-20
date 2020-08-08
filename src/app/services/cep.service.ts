import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cep } from "../models/cep.dto"

@Injectable({
	providedIn: 'root'
})
export class CepService {

	constructor(public http: HttpClient) { }

	getCep(cep) {
		return this.http.get<Cep>(`https://viacep.com.br/ws/${Number(cep)}/json/`)
	}
}
