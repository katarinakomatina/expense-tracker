package com.example.expensetracker.repository;

import com.example.expensetracker.model.Trosak;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TrosakRepository extends JpaRepository<Trosak, Long> {

    List<Trosak> findByKorisnikId(Long korisnikId);

    Optional<Trosak> findByIdAndKorisnikId(Long id, Long korisnikId);
}
