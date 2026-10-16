package com.example.expensetracker.service;

import com.example.expensetracker.dto.AuthOdgovor;
import com.example.expensetracker.dto.GoogleZahtev;
import com.example.expensetracker.dto.PrijavaZahtev;
import com.example.expensetracker.dto.RegistracijaZahtev;
import com.example.expensetracker.model.Korisnik;
import com.example.expensetracker.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final KorisnikRepository korisnikRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final String googleClientId;
    private final JwtDecoder googleDecoder;

    public AuthService(KorisnikRepository korisnikRepository,
                       PasswordEncoder passwordEncoder,
                       TokenService tokenService,
                       @Value("${app.google.client-id}") String googleClientId) {
        this.korisnikRepository = korisnikRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.googleClientId = googleClientId;
        this.googleDecoder = NimbusJwtDecoder
                .withJwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
                .build();
    }

    public AuthOdgovor registracija(RegistracijaZahtev zahtev) {
        String ime = zahtev.ime() == null ? "" : zahtev.ime().trim();
        String email = normalizujEmail(zahtev.email());
        String lozinka = zahtev.lozinka() == null ? "" : zahtev.lozinka();

        if (ime.isEmpty() || !email.contains("@") || lozinka.length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Neispravni podaci");
        }
        if (korisnikRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Nalog sa ovim emailom već postoji");
        }

        Korisnik korisnik = new Korisnik();
        korisnik.setIme(ime);
        korisnik.setEmail(email);
        korisnik.setLozinka(passwordEncoder.encode(lozinka));
        korisnik = korisnikRepository.save(korisnik);

        return odgovor(korisnik);
    }

    public AuthOdgovor prijava(PrijavaZahtev zahtev) {
        String email = normalizujEmail(zahtev.email());
        String lozinka = zahtev.lozinka() == null ? "" : zahtev.lozinka();

        Korisnik korisnik = korisnikRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Pogrešan email ili lozinka"));

        if (korisnik.getLozinka() == null || !passwordEncoder.matches(lozinka, korisnik.getLozinka())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Pogrešan email ili lozinka");
        }

        return odgovor(korisnik);
    }

    public AuthOdgovor google(GoogleZahtev zahtev) {
        Jwt googleToken;
        try {
            googleToken = googleDecoder.decode(zahtev.credential());
        } catch (JwtException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Google prijava nije uspela");
        }

        String izdavac = googleToken.getClaimAsString("iss");
        boolean dobarIzdavac = "https://accounts.google.com".equals(izdavac) || "accounts.google.com".equals(izdavac);
        boolean zaNasuAplikaciju = googleToken.getAudience() != null && googleToken.getAudience().contains(googleClientId);
        boolean potvrdjenEmail = Boolean.TRUE.equals(googleToken.getClaim("email_verified"));

        if (!dobarIzdavac || !zaNasuAplikaciju || !potvrdjenEmail) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Google prijava nije uspela");
        }

        String email = normalizujEmail(googleToken.getClaimAsString("email"));
        String ime = googleToken.getClaimAsString("name");

        Korisnik korisnik = korisnikRepository.findByEmail(email).orElseGet(() -> {
            Korisnik novi = new Korisnik();
            novi.setEmail(email);
            novi.setIme(ime != null ? ime : email);
            return korisnikRepository.save(novi);
        });

        return odgovor(korisnik);
    }

    private AuthOdgovor odgovor(Korisnik korisnik) {
        return new AuthOdgovor(tokenService.napraviToken(korisnik), korisnik.getIme(), korisnik.getEmail());
    }

    private String normalizujEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase();
    }
}
