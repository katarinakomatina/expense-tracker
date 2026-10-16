package com.example.expensetracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class Trosak {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String naziv;
    private Double iznos;
    private String kategorija;
    private LocalDate datum;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "korisnik_id")
    private Korisnik korisnik;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNaziv() { return naziv; }
    public void setNaziv(String naziv) { this.naziv = naziv; }

    public Double getIznos() { return iznos; }
    public void setIznos(Double iznos) { this.iznos = iznos; }

    public String getKategorija() { return kategorija; }
    public void setKategorija(String kategorija) { this.kategorija = kategorija; }

    public LocalDate getDatum() { return datum; }
    public void setDatum(LocalDate datum) { this.datum = datum; }

    public Korisnik getKorisnik() { return korisnik; }
    public void setKorisnik(Korisnik korisnik) { this.korisnik = korisnik; }
}
