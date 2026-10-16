import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { GoogleDugme } from '../google-dugme/google-dugme';

@Component({
  selector: 'app-registracija',
  imports: [FormsModule, RouterLink, GoogleDugme],
  templateUrl: './registracija.html',
  styleUrl: './registracija.css',
})
export class Registracija {
  ime: string = '';
  email: string = '';
  lozinka: string = '';
  ponovljenaLozinka: string = '';
  greska: string = '';
  salje: boolean = false;
  prikaziLozinku: boolean = false;
  prikaziPonovljenu: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  registruj() {
    if (this.ime.trim() == '' || this.email.trim() == '' || this.lozinka == '') {
      this.greska = 'Popuni sva polja';
      return;
    }
    if (!this.email.includes('@')) {
      this.greska = 'Unesi ispravan email';
      return;
    }
    if (this.lozinka.length < 6) {
      this.greska = 'Lozinka mora imati bar 6 karaktera';
      return;
    }
    if (this.lozinka != this.ponovljenaLozinka) {
      this.greska = 'Lozinke se ne poklapaju';
      return;
    }

    this.salje = true;
    this.greska = '';
    this.authService.registracija(this.ime.trim(), this.email.trim(), this.lozinka).subscribe({
      next: () => this.router.navigate(['/']),
      error: (odgovor) => {
        this.salje = false;
        if (odgovor.status === 409) {
          this.greska = 'Nalog sa ovim emailom već postoji';
        } else if (odgovor.status === 0) {
          this.greska = 'Server trenutno nije dostupan. Pokušaj ponovo za minut.';
        } else {
          this.greska = 'Registracija nije uspela. Proveri podatke.';
        }
      }
    });
  }
}
