package com.example.expensetracker.controller;

import com.example.expensetracker.dto.AuthOdgovor;
import com.example.expensetracker.dto.GoogleZahtev;
import com.example.expensetracker.dto.PrijavaZahtev;
import com.example.expensetracker.dto.RegistracijaZahtev;
import com.example.expensetracker.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/registracija")
    public AuthOdgovor registracija(@RequestBody RegistracijaZahtev zahtev) {
        return authService.registracija(zahtev);
    }

    @PostMapping("/prijava")
    public AuthOdgovor prijava(@RequestBody PrijavaZahtev zahtev) {
        return authService.prijava(zahtev);
    }

    @PostMapping("/google")
    public AuthOdgovor google(@RequestBody GoogleZahtev zahtev) {
        return authService.google(zahtev);
    }
}
