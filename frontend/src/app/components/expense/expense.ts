import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpenseModel } from '../../models/expense';
import { ExpenseService } from '../../services/expense';

// pomoćni tip: jedna mesečna grupa
interface MesecnaGrupa {
  naziv: string;        // npr. "Jun 2026"
  troskovi: ExpenseModel[];
  ukupno: number;
}

@Component({
  selector: 'app-expense',
  imports: [RouterLink],
  templateUrl: './expense.html',
  styleUrl: './expense.css',
})
export class Expense implements OnInit {
  grupe: MesecnaGrupa[] = [];
  ukupno: number = 0;
  otvorenId: number | null = null;  // koji trošak ima otvorene opcije

  private expenseService = inject(ExpenseService);

  imenaMeseci = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
                 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];

  ngOnInit() {
    this.ucitaj();
  }

  ucitaj() {
    let troskovi = this.expenseService.getAll();
    this.ukupno = this.expenseService.getUkupno();
    this.grupisiPoMesecima(troskovi);
  }

  grupisiPoMesecima(troskovi: ExpenseModel[]) {
    // sortiraj po datumu, najnoviji prvi
    troskovi.sort((a, b) => b.datum.localeCompare(a.datum));

    let rezultat: MesecnaGrupa[] = [];

    for (let t of troskovi) {
      let d = new Date(t.datum);
      let nazivMeseca = this.imenaMeseci[d.getMonth()] + ' ' + d.getFullYear();

      // da li grupa za ovaj mesec već postoji?
      let grupa = rezultat.find(g => g.naziv === nazivMeseca);

      if (grupa == undefined) {
        // ne postoji - napravi novu
        grupa = { naziv: nazivMeseca, troskovi: [], ukupno: 0 };
        rezultat.push(grupa);
      }

      grupa.troskovi.push(t);
      grupa.ukupno = grupa.ukupno + t.iznos;
    }

    this.grupe = rezultat;
  }

  formatDatum(datum: string): string {
    let d = new Date(datum);
    return d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear() + '.';
  }

  formatIznos(iznos: number): string {
    return iznos.toLocaleString('sr-RS');
  }

  // klik na olovčicu - otvori/zatvori opcije za taj trošak
  toggleOpcije(id: number) {
    if (this.otvorenId === id) {
      this.otvorenId = null;   // već otvoren -> zatvori
    } else {
      this.otvorenId = id;     // otvori ovaj
    }
  }

  obrisi(id: number) {
    if (confirm('Da li želiš da obrišeš ovaj trošak?')) {
      this.expenseService.delete(id);
      this.otvorenId = null;
      this.ucitaj();
    }
  }
}