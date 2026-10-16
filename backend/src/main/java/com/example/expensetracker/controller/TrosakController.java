package com.example.expensetracker.controller;

import com.example.expensetracker.model.Trosak;
import com.example.expensetracker.service.TrosakService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/troskovi")
public class TrosakController {

    private final TrosakService trosakService;

    public TrosakController(TrosakService trosakService) {
        this.trosakService = trosakService;
    }

    @GetMapping
    public List<Trosak> getAll(@AuthenticationPrincipal Jwt jwt) {
        return trosakService.getAll(korisnikId(jwt));
    }

    @GetMapping("/{id}")
    public Trosak getById(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return trosakService.getById(id, korisnikId(jwt));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Trosak dodaj(@RequestBody Trosak trosak, @AuthenticationPrincipal Jwt jwt) {
        return trosakService.dodaj(trosak, korisnikId(jwt));
    }

    @PutMapping("/{id}")
    public Trosak izmeni(@PathVariable Long id, @RequestBody Trosak trosak, @AuthenticationPrincipal Jwt jwt) {
        return trosakService.izmeni(id, trosak, korisnikId(jwt));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void obrisi(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        trosakService.obrisi(id, korisnikId(jwt));
    }

    private Long korisnikId(Jwt jwt) {
        return Long.valueOf(jwt.getSubject());
    }
}
