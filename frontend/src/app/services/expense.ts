import { Injectable } from '@angular/core';
import { ExpenseModel } from '../models/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  private kljuc: string = 'troskovi';
  private sledeciId: number = 1;

  getAll(): ExpenseModel[] {
    const podaci = localStorage.getItem(this.kljuc);
    if (podaci == null) {
      return [];
    }
    return JSON.parse(podaci);
  }

  add(trosak: ExpenseModel): void {
    const troskovi = this.getAll();
    trosak.id = this.sledeciId;
    this.sledeciId++;
    troskovi.push(trosak);
    localStorage.setItem(this.kljuc, JSON.stringify(troskovi));
  }

  delete(id: number): void {
    let troskovi = this.getAll();
    troskovi = troskovi.filter(t => t.id !== id);
    localStorage.setItem(this.kljuc, JSON.stringify(troskovi));
  }

  getUkupno(): number {
    const troskovi = this.getAll();
    let zbir = 0;
    for (let t of troskovi) {
      zbir = zbir + t.iznos;
    }
    return zbir;
  }

  // nađe jedan trošak po id-u
  getById(id: number): ExpenseModel | undefined {
    const troskovi = this.getAll();
    return troskovi.find(t => t.id === id);
  }

// menja postojeći trošak
  update(izmenjeni: ExpenseModel): void {
    let troskovi = this.getAll();
    troskovi = troskovi.map(t => t.id === izmenjeni.id ? izmenjeni : t);
    localStorage.setItem(this.kljuc, JSON.stringify(troskovi));
  }
}