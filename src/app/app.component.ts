import { Component } from '@angular/core';
import { CepService } from './services/cep.service';
import { Title } from '@angular/platform-browser';
import { title } from 'process';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from './services/person.service';
import { Person } from './models/person.dto';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'teste-helpper'
	columns = ['name', 'cpf', 'phone', 'email', 'cep', 'state', 'city', 'street', 'actions']
	selectedPerson: any
	deletingPerson: boolean = false;
	loading: boolean
	personFormGroup: FormGroup

	constructor(public cep: CepService,
		private titleService: Title,
		private formBuilder: FormBuilder,
		public personsService: PersonService) {
		this.personFormGroup = this.formBuilder.group({
			name: ['', [Validators.required]],
			cpf: ['', [Validators.required,]],
			phone: ['', [Validators.required]],
			email: ['', [Validators.required]],
			cep: ['', [Validators.required]],
			state: ['', [Validators.required]],
			city: ['', [Validators.required]],
			street: ["", [Validators.required]]
		})
	}

	addPerson() {
		this.selectedPerson = {}
	}

	editPerson(person: Person) {
		this.selectedPerson = person
		this.personFormGroup.controls.name.setValue(person.name)
		this.personFormGroup.controls.cpf.setValue(person.cpf)
		this.personFormGroup.controls.phone.setValue(person.phone)
		this.personFormGroup.controls.email.setValue(person.email)
		this.personFormGroup.controls.cep.setValue(person.cep)
		this.personFormGroup.controls.state.setValue(person.state)
		this.personFormGroup.controls.city.setValue(person.city)
		this.personFormGroup.controls.street.setValue(person.street)
	}

	deletePerson(person) {
		this.deletingPerson = true
		this.personsService.removePerson(person);
		this.deletingPerson = false
	}

	changeCep(event) {
		var cep = event.target.value
		if (cep.length == 8) {
			this.loading = true
			this.cep.getCep(cep).subscribe(response => {
				if (response.erro) {
					alert('Cep não encontrado')
				} else {
					this.personFormGroup.controls.cep.setValue(response.cep.replace('-', ''))
					this.personFormGroup.controls.state.setValue(response.uf)
					this.personFormGroup.controls.city.setValue(response.localidade)
					this.personFormGroup.controls.street.setValue(response.logradouro)
				}
			},
				error => {
					alert('Erro ao buscar o cep')
					console.error(error)
				}
			)
			this.loading = false

		}
	}

	cancel() {
		this.personFormGroup.reset();
		this.selectedPerson = null
	}

	submit() {
		if (this.personFormGroup.invalid) {
			alert('Erro! Preencha todos os campos!')
		} else {
			// Caso a pessoa não extesa ediantando. O CPF não será encontrado e o novo usuário sera adicionado automaticamente.
			this.personsService.updatePerson(this.personFormGroup.value)
		}
		this.cancel()
	}

}