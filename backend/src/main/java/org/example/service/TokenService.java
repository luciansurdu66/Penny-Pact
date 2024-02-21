package org.example.service;

import com.nimbusds.jose.proc.BadJWSException;
import org.example.model.User;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;

@Service
public class TokenService {

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;

    public TokenService(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
    }

    public String generateJwt(User user) {
        int TOKEN_EXPIRATION_SECONDS = 3600;

        JwtClaimsSet claims = JwtClaimsSet.builder()
            .subject(user.getEmail())
            .expiresAt(Instant.now().plusSeconds(TOKEN_EXPIRATION_SECONDS))
            .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims))
            .getTokenValue();
    }

    public String getTokenSubject(String token) throws JwtException {
        return jwtDecoder.decode(token)
            .getSubject();
    }
}
