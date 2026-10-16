package com.example.expensetracker.service;

import com.example.expensetracker.model.Trosak;
import com.example.expensetracker.repository.KorisnikRepository;
import com.example.expensetracker.repository.TrosakRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TrosakService {

    private final TrosakRepository trosakRepository;
    private final KorisnikRepository korisnikRepository;

    public TrosakService(TrosakRepository trosakRepository, KorisnikRepository korisnikRepository) {
        this.trosakRepository = trosakRepository;
        this.korisnikRepository = korisnikRepository;
    }

    public List<Trosak> getAll(Long korisnikId) {
        return trosakRepository.findByKorisnikId(korisnikId);
    }

    public Trosak getById(Long id, Long korisnikId) {
        return trosakRepository.findByIdAndKorisnikId(id, korisnikId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Trošak ne postoji"));
    }

    public Trosak dodaj(Trosak trosak, Long korisnikId) {
        proveri(trosak);
        trosak.setId(null);
        trosak.setNaziv(trosak.getNaziv().trim());
        trosak.setKorisnik(korisnikRepository.getReferenceById(korisnikId));
        return trosakRepository.save(trosak);
    }

    public Trosak izmeni(Long id, Trosak izmenjeni, Long korisnikId) {
        proveri(izmenjeni);
        Trosak postojeci = getById(id, korisnikId);
        postojeci.setNaziv(izmenjeni.getNaziv().trim());
        postojeci.setIznos(izmenjeni.getIznos());
        postojeci.setKategorija(izmenjeni.getKategorija());
        postojeci.setDatum(izmenjeni.getDatum());
        return trosakRepository.save(postojeci);
    }

    public void obrisi(Long id, Long korisnikId) {
        Trosak trosak = getById(id, korisnikId);
        trosakRepository.delete(trosak);
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
