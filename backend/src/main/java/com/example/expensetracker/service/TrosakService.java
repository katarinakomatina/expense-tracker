package com.example.expensetracker.service;

import com.example.expensetracker.model.Trosak;
import com.example.expensetracker.repository.TrosakRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TrosakService {

    private final TrosakRepository trosakRepository;

    public TrosakService(TrosakRepository trosakRepository) {
        this.trosakRepository = trosakRepository;
    }

    public List<Trosak> getAll() {
        return trosakRepository.findAll();
    }

    public Trosak getById(Long id) {
        return trosakRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Trošak ne postoji"));
    }

    public Trosak dodaj(Trosak trosak) {
        proveri(trosak);
        trosak.setId(null);
        return trosakRepository.save(trosak);
    }

    public Trosak izmeni(Long id, Trosak izmenjeni) {
        proveri(izmenjeni);
        Trosak postojeci = getById(id);
        postojeci.setNaziv(izmenjeni.getNaziv().trim());
        postojeci.setIznos(izmenjeni.getIznos());
        postojeci.setKategorija(izmenjeni.getKategorija());
        postojeci.setDatum(izmenjeni.getDatum());
        return trosakRepository.save(postojeci);
    }

    public void obrisi(Long id) {
        if (!trosakRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Trošak ne postoji");
        }
        trosakRepository.deleteById(id);
    }

    private void proveri(Trosak t) {
        if (t.getNaziv() == null || t.getNaziv().trim().isEmpty()
                || t.getIznos() == null
                || t.getKategorija() == null || t.getKategorija().isEmpty()
                || t.getDatum() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sva polja su obavezna");
        }
        if (t.getIznos() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Iznos mora biti veći od nule");
        }
    }
}
