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

  idZaIzmenu: number | null = null;  // ako menjamo postojeći

  private expenseService = inject(ExpenseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // proveri ima li id u ruti (znači izmena)
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.idZaIzmenu = Number(id);
      let trosak = this.expenseService.getById(this.idZaIzmenu);
      if (trosak != undefined) {
        this.naziv = trosak.naziv;
        this.iznos = trosak.iznos;
        this.kategorija = trosak.kategorija;
        this.datum = trosak.datum;
      }
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

      if (this.idZaIzmenu != null) {
        // izmena postojećeg
        trosak.id = this.idZaIzmenu;
        this.expenseService.update(trosak);
      } else {
        // novi trošak
        this.expenseService.add(trosak);
      }

      this.router.navigate(['/']);
    }
  }
}