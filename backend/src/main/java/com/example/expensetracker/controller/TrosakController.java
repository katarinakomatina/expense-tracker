package com.example.expensetracker.controller;

import com.example.expensetracker.model.Trosak;
import com.example.expensetracker.service.TrosakService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/troskovi")
public class TrosakController {

    private final TrosakService trosakService;

    public TrosakController(TrosakService trosakService) {
        this.trosakService = trosakService;
    }

    @GetMapping
    public List<Trosak> getAll() {
        return trosakService.getAll();
    }

    @GetMapping("/{id}")
    public Trosak getById(@PathVariable Long id) {
        return trosakService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Trosak dodaj(@RequestBody Trosak trosak) {
        return trosakService.dodaj(trosak);
    }

    @PutMapping("/{id}")
    public Trosak izmeni(@PathVariable Long id, @RequestBody Trosak trosak) {
        return trosakService.izmeni(id, trosak);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void obrisi(@PathVariable Long id) {
        trosakService.obrisi(id);
    }
}
