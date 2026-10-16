import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthOdgovor } from '../models/auth';
import { API_URL } from '../api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private url: string = API_URL + '/api/auth';

  registracija(ime: string, email: string, lozinka: string): Observable<AuthOdgovor> {
    return this.http.post<AuthOdgovor>(this.url + '/registracija', { ime, email, lozinka })
      .pipe(tap(odgovor => this.sacuvaj(odgovor)));
  }

  prijava(email: string, lozinka: string): Observable<AuthOdgovor> {
    return this.http.post<AuthOdgovor>(this.url + '/prijava', { email, lozinka })
      .pipe(tap(odgovor => this.sacuvaj(odgovor)));
  }

  google(credential: string): Observable<AuthOdgovor> {
    return this.http.post<AuthOdgovor>(this.url + '/google', { credential })
      .pipe(tap(odgovor => this.sacuvaj(odgovor)));
  }

  odjava(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('ime');
    this.router.navigate(['/prijava']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getIme(): string {
    return localStorage.getItem('ime') ?? '';
  }

  jeUlogovan(): boolean {
    const token = this.getToken();
    if (token == null) {
      return false;
    }
    try {
      const podaci = JSON.parse(atob(token.split('.')[1]));
      return podaci.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  private sacuvaj(odgovor: AuthOdgovor): void {
    localStorage.setItem('token', odgovor.token);
    localStorage.setItem('ime', odgovor.ime);
  }
}
