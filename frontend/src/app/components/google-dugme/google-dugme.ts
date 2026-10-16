import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, Output, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { GOOGLE_CLIENT_ID } from '../../api';

declare const google: any;

@Component({
  selector: 'app-google-dugme',
  template: '<div class="google-mesto" #dugme></div>',
  styles: '.google-mesto { display: flex; justify-content: center; min-height: 44px; }',
})
export class GoogleDugme implements AfterViewInit {
  @ViewChild('dugme') dugme!: ElementRef;
  @Output() greska = new EventEmitter<string>();

  private authService = inject(AuthService);
  private router = inject(Router);
  private zone = inject(NgZone);
  private pokusaji: number = 0;

  ngAfterViewInit() {
    this.prikazi();
  }

  prikazi() {
    if (typeof google === 'undefined') {
      this.pokusaji++;
      if (this.pokusaji < 50) {
        setTimeout(() => this.prikazi(), 200);
      }
      return;
    }

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (odgovor: any) => this.zone.run(() => this.prijaviSe(odgovor.credential)),
    });

    google.accounts.id.renderButton(this.dugme.nativeElement, {
      theme: 'filled_black',
      size: 'large',
      shape: 'pill',
      text: 'continue_with',
      locale: 'sr',
    });
  }

  prijaviSe(credential: string) {
    this.authService.google(credential).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.greska.emit('Prijava preko Google-a nije uspela. Pokušaj ponovo.'),
    });
  }
}
