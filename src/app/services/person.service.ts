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

  isExistPerson(person: Person){
    return this.persons.findIndex(foundPerson => foundPerson.cpf == String(person.cpf));
  }

  addPerson(person: Person) {
    this.persons.push(person);
    this.savePersons();
  }

  updatePerson(person: Person){
    var index = this.isExistPerson(person);
    if(index != -1){
      this.persons[index] = person
      this.savePersons();
    }else{
      this.addPerson(person)
    }
  }

  removePerson(person: Person){
    var index = this.isExistPerson(person)
    if(index != -1){
      this.persons.splice(index,1)
      this.savePersons();
    }
  }

  
}
