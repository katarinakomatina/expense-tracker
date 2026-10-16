import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpenseModel } from '../../models/expense';
import { ExpenseService } from '../../services/expense';
import { AuthService } from '../../services/auth';

interface MesecnaGrupa {
  naziv: string;
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
  otvorenId: number | null = null;
  ucitavanje: boolean = true;
  greska: string = '';

  private expenseService = inject(ExpenseService);
  private authService = inject(AuthService);
  ime: string = this.authService.getIme();

  imenaMeseci = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
                 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];

  ngOnInit() {
    this.ucitaj();
  }

  ucitaj() {
    this.ucitavanje = true;
    this.greska = '';
    this.expenseService.getAll().subscribe({
      next: (troskovi) => {
        this.ukupno = 0;
        for (let t of troskovi) {
          this.ukupno = this.ukupno + t.iznos;
        }
        this.grupisiPoMesecima(troskovi);
        this.ucitavanje = false;
      },
      error: () => {
        this.greska = 'Server trenutno nije dostupan. Pokušaj ponovo za minut.';
        this.ucitavanje = false;
      }
    });
  }

  grupisiPoMesecima(troskovi: ExpenseModel[]) {
    troskovi.sort((a, b) => b.datum.localeCompare(a.datum));

    let rezultat: MesecnaGrupa[] = [];

    for (let t of troskovi) {
      let d = new Date(t.datum);
      let nazivMeseca = this.imenaMeseci[d.getMonth()] + ' ' + d.getFullYear();

      let grupa = rezultat.find(g => g.naziv === nazivMeseca);

      if (grupa == undefined) {
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

  toggleOpcije(id: number) {
    if (this.otvorenId === id) {
      this.otvorenId = null;
    } else {
      this.otvorenId = id;
    }
  }

  obrisi(id: number) {
    if (confirm('Da li želiš da obrišeš ovaj trošak?')) {
      this.expenseService.delete(id).subscribe(() => {
        this.otvorenId = null;
        this.ucitaj();
      });
    }
  }

  odjavi() {
    this.authService.odjava();
  }
}
