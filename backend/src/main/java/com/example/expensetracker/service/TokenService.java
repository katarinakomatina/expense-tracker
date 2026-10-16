package com.example.expensetracker.service;

import com.example.expensetracker.model.Korisnik;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class TokenService {

    private final JwtEncoder jwtEncoder;

    public TokenService(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    public String napraviToken(Korisnik korisnik) {
        Instant sada = Instant.now();

        JwtClaimsSet podaci = JwtClaimsSet.builder()
                .issuer("expense-tracker")
                .issuedAt(sada)
                .expiresAt(sada.plus(7, ChronoUnit.DAYS))
                .subject(korisnik.getId().toString())
                .claim("ime", korisnik.getIme())
                .build();

        JwsHeader zaglavlje = JwsHeader.with(MacAlgorithm.HS256).build();
        return jwtEncoder.encode(JwtEncoderParameters.from(zaglavlje, podaci)).getTokenValue();
    }
}
