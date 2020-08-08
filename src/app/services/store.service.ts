import { Injectable } from '@angular/core';
import { Person } from '../models/person.dto';
import { STORAGE_KEYS } from '../config/storage_keys';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  getAllStore(): Person[] {
    let urs = localStorage.getItem(STORAGE_KEYS.persons)
    if (urs == null) {
      return null
    } else {
      return JSON.parse(urs)
    }
  }

  setAllStore(obj: Person[]) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.persons)
    } else {
      localStorage.setItem(STORAGE_KEYS.persons, JSON.stringify(obj))
    }
  }
}
