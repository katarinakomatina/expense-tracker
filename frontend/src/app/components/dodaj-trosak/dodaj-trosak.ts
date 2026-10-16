import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ExpenseModel } from '../../models/expense';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-dodaj-trosak',
  imports: [FormsModule, RouterLink],
  templateUrl: './dodaj-trosak.html',
  styleUrl: './dodaj-trosak.css',
})
export class DodajTrosak implements OnInit {
  naziv: string = '';
  iznos: number | null = null;
  kategorija: string = '';
  datum: string = '';
  greska: string = '';

  idZaIzmenu: number | null = null;

  private expenseService = inject(ExpenseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.idZaIzmenu = Number(id);
      this.expenseService.getById(this.idZaIzmenu).subscribe(trosak => {
        this.naziv = trosak.naziv;
        this.iznos = trosak.iznos;
        this.kategorija = trosak.kategorija;
        this.datum = trosak.datum;
      });
    }
  }

  dodaj() {
    const nazivTrim = this.naziv.trim();

    if (nazivTrim == '' || this.iznos == null || this.kategorija == '' || this.datum == '') {
      this.greska = 'Molimo vas da ukucate sve podatke u formi';
    } else if (this.iznos <= 0) {
      this.greska = 'Iznos mora biti veći od nule';
    } else {
      let trosak = new ExpenseModel();
      trosak.naziv = nazivTrim;
      trosak.iznos = this.iznos;
      trosak.kategorija = this.kategorija;
      trosak.datum = this.datum;

      let zahtev;
      if (this.idZaIzmenu != null) {
        trosak.id = this.idZaIzmenu;
        zahtev = this.expenseService.update(trosak);
      } else {
        zahtev = this.expenseService.add(trosak);
      }

      zahtev.subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.greska = 'Čuvanje nije uspelo. Proveri da li server radi.'
      });
    }
  }
}
