import { Routes } from '@angular/router';
import { Expense } from './components/expense/expense';
import { DodajTrosak } from './components/dodaj-trosak/dodaj-trosak';
import { Prijava } from './components/prijava/prijava';
import { Registracija } from './components/registracija/registracija';
import { ulogovanGuard, gostGuard } from './guards/auth';

export const routes: Routes = [
  { path: '', component: Expense, canActivate: [ulogovanGuard] },
  { path: 'dodaj', component: DodajTrosak, canActivate: [ulogovanGuard] },
  { path: 'izmeni/:id', component: DodajTrosak, canActivate: [ulogovanGuard] },
  { path: 'prijava', component: Prijava, canActivate: [gostGuard] },
  { path: 'registracija', component: Registracija, canActivate: [gostGuard] },
  { path: '**', redirectTo: '' }
];
