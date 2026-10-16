import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { GoogleDugme } from '../google-dugme/google-dugme';

@Component({
  selector: 'app-prijava',
  imports: [FormsModule, RouterLink, GoogleDugme],
  templateUrl: './prijava.html',
  styleUrl: './prijava.css',
})
export class Prijava {
  email: string = '';
  lozinka: string = '';
  greska: string = '';
  salje: boolean = false;
  prikaziLozinku: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  prijavi() {
    if (this.email.trim() == '' || this.lozinka == '') {
      this.greska = 'Unesi email i lozinku';
      return;
    }

    this.salje = true;
    this.greska = '';
    this.authService.prijava(this.email.trim(), this.lozinka).subscribe({
      next: () => this.router.navigate(['/']),
      error: (odgovor) => {
        this.salje = false;
        if (odgovor.status === 401) {
          this.greska = 'Pogrešan email ili lozinka';
        } else if (odgovor.status === 0) {
          this.greska = 'Server trenutno nije dostupan. Pokušaj ponovo za minut.';
        } else {
          this.greska = 'Prijava nije uspela. Pokušaj ponovo.';
        }
      }
    });
  }
}
