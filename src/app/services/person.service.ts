import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Person } from '../models/person.dto';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  public persons: Person[];

  constructor(private store: StoreService) {
    this.persons = store.getAllStore();
  }

  savePersons() {
    this.store.setAllStore(this.persons);
  }

  addPerson(person: Person) {
    this.persons.push(person);
    this.savePersons();
  }
}
