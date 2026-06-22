import { Routes } from '@angular/router';
import { Expense } from './components/expense/expense';
import { DodajTrosak } from './components/dodaj-trosak/dodaj-trosak';

export const routes: Routes = [
  { path: '', component: Expense },
  { path: 'dodaj', component: DodajTrosak },
  { path: 'izmeni/:id', component: DodajTrosak }
];